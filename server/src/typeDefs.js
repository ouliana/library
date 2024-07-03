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
  authorId: Int!
  author: Author
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
  password: String!
  name: String
  role: String!
  avatar: String
  favoriteBooks: [Book]
  favoriteGenres: [Genre]
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(firstName: String, lastName: String, genres: [Int]): [Book]
    bookById(id: Int): Book
    booksByAuthorId(authorId: Int): [Book]
    booksByAuthorName(firstName: String, lastName: String): [Book]
    booksByGenre(genreId: Int): [Book]
    genreWithBooks(id: Int): Genre
    allAuthors: [Author]
    authorById(id: Int): Author
    allGenres: [Genre]
    currentUser: User
  }

  type Mutation {
    addAuthor(
      firstName: String!
      lastName: String!
      born: Int
      profile: String
      creditText: String
      creditLink: String
      annotation: String!
    ): Author

    addBook(
      authorId: Int!
      title: String!
      annotation: String!
      published: Int
      genres: [Int!]!
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
    authorAdded: Author!
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
