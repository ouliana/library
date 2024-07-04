const { PubSub } = require('graphql-subscriptions');
const booksService = require('../db/books-service');
const genresService = require('../db/genres-service');

const authorsService = require('../db/authors-service');
const usersService = require('../db/users-service');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { compare } = require('bcrypt');
const { sanitizeInput, authorSchema, bookSchema } = require('./joi-schemas');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: async () => {
      const count = await authorsService.getCount();
      return count;
    },
    allBooks: async (_root, args) => {
      if (!Object.keys(args).length) {
        const books = await booksService.findAll();
        return books;
      }

      if (args.author && args.genres) {
        const books = await booksService.findByAuthor(args.author);
        return books.filter(b => b.genres.includes(args.genre));
      }

      if (args.author) {
        const books = await booksService.findByAuthor(args.author);
        return books;
      }

      if (args.genres) {
        const books = await booksService.findByGenres(args.genres);
        return books;
      }
    },
    bookById: async (_root, args) => {
      try {
        const book = await booksService.findById(args.id);
        return book;
      } catch (error) {
        throw new Error('Не удалось получить книгу по id');
      }
    },

    booksByAuthorId: async (_root, args) => {
      const books = await booksService.findByAuthorId(args.authorId);
      return books;
    },

    booksByGenre: async (_root, args) => {
      try {
        const books = await booksService.findByGenre(args.genreId);
        return books;
      } catch (error) {
        throw new Error('Не удалось получить книгу по id жанра');
      }
    },

    genreWithBooks: async (_root, args) => {
      try {
        const genre = await genresService.findAllBooks(args.id);
        return genre;
      } catch (error) {
        throw new Error('Не удалось получить жанр по id');
      }
    },

    allAuthors: async (_root, _args) => {
      const authors = await authorsService.findAll();
      return authors;
    },

    authorById: async (_root, args) => {
      const author = await authorsService.findById(args.id);
      return author;
    },

    allGenres: async (_root, args) => {
      const genres = await genresService.findAll();
      return genres;
    },

    currentUser: async (_root, _args, context) => context.currentUser
  },

  Mutation: {
    createAuthor: async (_root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const sanitizedArgs = {
        firstName: sanitizeInput(args.firstName),
        lastName: sanitizeInput(args.lastName),
        born: Number(sanitizeInput(args.born)),
        profile: sanitizeInput(args.profile),
        creditText: sanitizeInput(args.creditText),
        creditLink: sanitizeInput(args.creditLink),
        annotation: sanitizeInput(args.annotation)
      };

      const { error } = authorSchema.validate(sanitizedArgs);
      if (error) {
        throw new GraphQLError(
          `Validation error: ${error.details.map(e => e.message).join(', ')}`,
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: invalid
            }
          }
        );
      }
      const author = await authorsService.save(sanitizedArgs);

      pubsub.publish('AUTHOR_CREATED', { authorCreated: author });
      return author;
    },

    updateAuthor: async (_root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const sanitizedArgs = {
        firstName: sanitizeInput(args.firstName),
        lastName: sanitizeInput(args.lastName),
        born: Number(sanitizeInput(args.born)),
        profile: sanitizeInput(args.profile),
        creditText: sanitizeInput(args.creditText),
        creditLink: sanitizeInput(args.creditLink),
        annotation: sanitizeInput(args.annotation)
      };

      const { error } = authorSchema.validate(sanitizedArgs);
      if (error) {
        throw new GraphQLError(
          `Validation error: ${error.details.map(e => e.message).join(', ')}`,
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: invalid
            }
          }
        );
      }
      const author = await authorsService.update({
        ...sanitizedArgs,
        id: Number(args.id)
      });

      pubsub.publish('AUTHOR_UPDATED', { authorUpdated: author });
      return author;
    },

    createBook: async (_root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const sanitizedArgs = {
        title: sanitizeInput(args.title),
        published: Number(sanitizeInput(args.published)),
        authorId: args.authorId,
        annotation: sanitizeInput(args.annotation),
        genres: args.genres
      };

      const { error } = bookSchema.validate(sanitizedArgs);

      if (error) {
        throw new GraphQLError('The book title or author name are too short', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: invalid
          }
        });
      }

      const book = await booksService.save(sanitizedArgs);

      pubsub.publish('BOOK_CREATED', { bookCreated: book });
      return book;
    },

    createUser: async (root, args) => {
      const person = await usersService.findByUsername(args.username);

      if (person) {
        throw new GraphQLError(`The user ${args.username} is already exist`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username
          }
        });
      }

      const newUser = await usersService.save({ ...args });
      return newUser;
    },

    login: async (_root, args) => {
      const user = await usersService.findByUsername(args.username);
      if (user) {
        const passwordsMatch = await compare(args.password, user.password);
        if (!passwordsMatch) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          });
        }
      } else {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const userForToken = {
        username: args.username,
        id: user.id
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  },

  Subscription: {
    authorCreated: {
      subscribe: () => pubsub.asyncIterator('AUTHOR_CREATED')
    },
    authorUpdated: {
      subscribe: () => pubsub.asyncIterator('AUTHOR_UPDATED')
    },
    bookCreated: {
      subscribe: () => pubsub.asyncIterator('BOOK_CREATED')
    }
  }
};

module.exports = resolvers;
