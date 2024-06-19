import { gql } from '@apollo/client';
import { AUTHOR_DETAILS, BOOK_DETAILS, BOOK_DATA_FOR_TABLE } from './fragments';

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      id
      firstName
      lastName
      born
      bookCount
    }
  }
`;

export const AUTHOR_BY_ID = gql`
  ${AUTHOR_DETAILS}
  query AuthorById($id: Int) {
    authorById(id: $id) {
      ...AuthorDetails
    }
  }
`;

export const ALL_BOOKS = gql`
  ${BOOK_DETAILS}
  query GetBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
`;

export const BOOK_BY_ID = gql`
  ${BOOK_DETAILS}
  query GetBookById($id: Int) {
    bookById(id: $id) {
      ...BookDetails
    }
  }
`;
export const BOOKS_BY_AUTHOR_ID = gql`
  query GetBooksByAuthorId($authorId: Int) {
    booksByAuthorId(authorId: $authorId) {
      id
      title
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genreId: Int) {
    booksByGenre(genreId: $genreId) {
      id
      title
      author
      authorId
    }
  }
`;

export const GENRE = gql`
  ${BOOK_DATA_FOR_TABLE}
  query GetGenreWithBooks($id: Int) {
    genreWithBooks(id: $id) {
      name
      books {
        ...BookDataForTable
      }
    }
  }
`;

export const ALL_GENRES = gql`
  query GetAllGenres {
    allGenres {
      id
      name
    }
  }
`;

export const ME = gql`
  query CurrentUser {
    me {
      username
      name
      avatar
      favoriteBooks {
        id
        title
        author
      }
      favoriteGenres {
        id
        name
      }
    }
  }
`;

export const CREATE_BOOK = gql`
  ${BOOK_DETAILS}
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
`;

export const SET_BIRTH_YEAR = gql`
  mutation setBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  ${BOOK_DETAILS}
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
`;
