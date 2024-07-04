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
  id: ID!
  title: String!
  published: Int!
  authorId: Int!
  author: Author
  genres: [Genre!]!
  annotation: String
}

type Genre {
  id: ID!
name: String!
books: [Book]
}

type User {
  id: ID!
  username: String!
  password: String!
  name: String
  role: String!
  avatar: String
  favoriteBooks: [Book]
  favoriteGenres: [Genre]
}

type Token {
  value: String!
}

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(firstName: String, lastName: String, genres: [ID]): [Book]
    bookById(id: ID): Book
    booksByAuthorId(authorId: ID): [Book]
    booksByAuthorName(firstName: String, lastName: String): [Book]
    booksByGenre(genreId: ID): [Book]
    genreWithBooks(id: ID): Genre
    allAuthors: [Author]
    authorById(id: ID): Author
    allGenres: [Genre]
    currentUser: User
  }

  type Mutation {
    createAuthor(
      firstName: String!
      lastName: String!
      born: Int
      profile: String
      creditText: String
      creditLink: String
      annotation: String!
    ): Author

    updateAuthor(
      id: ID!
      firstName: String!
      lastName: String!
      born: Int
      profile: String
      creditText: String
      creditLink: String
      annotation: String!
    ): Author

    createBook(
      authorId: ID!
      title: String!
      annotation: String!
      published: Int
      genres: [ID!]!
    ): Book

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
    authorCreated: Author!
    authorUpdated: Author!
    bookCreated: Book!
  }
`;

module.exports = typeDefs;
