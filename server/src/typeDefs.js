const typeDefs = `
type Author {
  id: ID!
  firstName: String!
  lastName: String!
  born: Int
  profile: String
  creditText: String
  creditLink: String
  annotation: String
  bookCount: Int!
}

type Book {
  title: String!
  published: Int!
  author: String!
  authorId: Int!
  genres: [Genre!]!
  annotation: String
  id: ID!
}

type Genre {
name: String!
id: ID!
books: [Book]
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    bookById(id: Int): Book
    booksByAuthorId(authorId: Int): [Book]
    booksByAuthorName(name: String): [Book]
    booksByGenre(genreId: Int): [Book]
    genreWithBooks(id: Int): Genre
    allAuthors: [Author]
    authorById(id: Int): Author
    allGenres: [Genre]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
