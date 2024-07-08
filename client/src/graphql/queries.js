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
  query AuthorById($id: ID) {
    authorById(id: $id) {
      ...AuthorDetails
    }
  }
`;

export const AUTHOR_EXISTS = gql`
  query AuthorExists($firstName: String, $lastName: String) {
    authorExists(firstName: $firstName, lastName: $lastName) {
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  ${BOOK_DETAILS}
  query GetBooks($firstName: String, $lastName: String, $genres: [ID]) {
    allBooks(firstName: $firstName, lastName: $lastName, genres: $genres) {
      ...BookDetails
    }
  }
`;

export const BOOK_BY_ID = gql`
  ${BOOK_DETAILS}
  query GetBookById($id: ID) {
    bookById(id: $id) {
      ...BookDetails
    }
  }
`;
export const BOOKS_BY_AUTHOR_ID = gql`
  query GetBooksByAuthorId($authorId: ID) {
    booksByAuthorId(authorId: $authorId) {
      id
      title
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genreId: ID) {
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
  query GetGenreWithBooks($id: ID) {
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

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      username
      name
      avatar
      favoriteBooks {
        id
        title
        author {
          firstName
          lastName
        }
        published
      }
      favoriteGenres {
        id
        name
      }
    }
  }
`;
