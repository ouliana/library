const booksService = require('../dbConnection/books-service');
const authorsService = require('../dbConnection/authors-service');
const usersService = require('../dbConnection/users-service');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const resolvers = {
  Author: {
    bookCount: async (root, args) => {
      const books = await booksService.findByAuthor(root.name);
      return books.length;
    },
  },

  Query: {
    bookCount: async () => {
      const books = await booksService.findAll();
      return books.length;
    },
    authorCount: async () => {
      const authors = await authorsService.findAll();
      return authors.length;
    },
    allBooks: async (root, args) => {
      if (!(args.author || args.genre)) {
        const books = await booksService.findAll();
        return books;
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
        return books.filter(b => b.genres.includes(args.genre));
      }
    },
    allAuthors: async () => {
      const authors = await authorsService.findAll();
      return authors;
    },
    me: async (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      if (args.title.length < 3 || args.author.length < 3) {
        const invalid = [args.title, args.author].filter(arg => arg.length < 3);

        throw new GraphQLError('The book title or author name are too short', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: invalid,
          },
        });
      }

      const book = await booksService.save({ ...args });

      const authors = await authorsService.findAll();

      if (!authors.find(a => a.name === args.author)) {
        await authorsService.save({ name: args.author });
      }
      return book;
    },

    editAuthor: async (root, args) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
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
            invalidArgs: args.username,
          },
        });
      }

      const newUser = await usersService.save({ ...args });
      return newUser;
    },

    login: async (root, args) => {
      const user = await usersService.findByUsername(args.username);

      if (!user || args.password !== 'secret') {
        throw GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: args.username,
        id: user.id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

module.exports = resolvers;
