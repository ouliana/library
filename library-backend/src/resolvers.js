const booksService = require('../dbConnection/books-service');
const { PubSub } = require('graphql-subscriptions');

const authorsService = require('../dbConnection/authors-service');
const usersService = require('../dbConnection/users-service');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

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
        const result = books.map(book => ({
          ...book,
          author: `${book.author.firstName} ${book.author.lastName}`,
          genres: book.genres.map(genre => genre.name)
        }));
        return result;
      }

      if (args.author && args.genre) {
        const books = await booksService.findByAuthor(args.author);
        return books.filter(b => b.genres.includes(args.genre));
      }

      if (args.author) {
        const books = await booksService.findByAuthor(args.author);
        return books;
      }

      if (args.genre) {
        const books = await booksService.findAll();
        return args.genre === 'all'
          ? books
          : books.filter(b => b.genres.includes(args.genre));
      }
    },
    bookById: async (_root, args) => {
      try {
        const book = await booksService.findById(args.id);
        const res = {
          ...book,
          author: `${book.author.firstName} ${book.author.lastName}`,
          genres: book.genres.map(genre => genre.name)
        };
        console.log(res);
        return res;
      } catch (error) {
        throw new Error('Не удалось получить книгу по id');
      }
    },
    booksByAuthorId: async (_root, args) => {
      const books = await booksService.findByAuthorId(args.authorId);
      return books;
    },
    booksByAuthorName: async (_root, args) => {
      const books = await booksService.findByAuthorId(args.id);
      if (!books) return [];
      return books.map(book => ({
        ...book,
        genres: book.genres.map(genre => genre.name)
      }));
    },

    allAuthors: async (_root, _args) => {
      console.log('in resolver');
      const authors = await authorsService.findAll();
      console.log(authors);
      return authors;
    },

    authorById: async (_root, args) => {
      const author = await authorsService.findById(args.id);
      return author;
    },

    me: async (_root, _args, context) => context.currentUser
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      if (args.title.length < 3 || args.author.length < 3) {
        const invalid = [args.title, args.author].filter(arg => arg.length < 3);

        throw new GraphQLError('The book title or author name are too short', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: invalid
          }
        });
      }

      const book = await booksService.save({ ...args });

      const authors = await authorsService.findAll();

      if (!authors.find(a => a.name === args.author)) {
        await authorsService.save({ name: args.author });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      return book;
    },

    editAuthor: async (root, args) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const doc = await authorsService.findDocByName(args.name);

      const updatedDoc = { ...doc, born: args.setBornTo };

      const updatedAuthor = await authorsService.save(updatedDoc);
      return updatedAuthor;
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
      console.log('args: ', args);
      if (!user || args.password !== 'secret') {
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
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
};

module.exports = resolvers;
