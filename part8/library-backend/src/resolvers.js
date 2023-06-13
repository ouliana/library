const booksService = require('../dbConnection/books-service');
const authorsService = require('../dbConnection/authors-service');
const { GraphQLError } = require('graphql');
const { v1: uuid } = require('uuid');

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
  },

  Mutation: {
    addBook: async (root, args) => {
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
      const doc = await authorsService.findDocByName(args.name);

      const updatedDoc = { ...doc, born: args.setBornTo };

      const updatedAuthor = await authorsService.save(updatedDoc);
      return updatedAuthor;
    },
  },
};

module.exports = resolvers;
