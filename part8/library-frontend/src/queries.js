import { gql } from '@apollo/client';

export const ALL_AUTORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query GetBooks {
    allBooks {
      title
      author
      published
      genres
    }
  }
`;

export const ME = gql`
  query CurrentUser {
    me {
      favoriteGenre
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      author
      title
      published
    }
  }
`;

export const CREATE_BOOK = gql`
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
      title
      author
      published
      genres
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
