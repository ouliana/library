import { gql } from '@apollo/client';
import { AUTHOR_DETAILS, BOOK_DETAILS } from './fragments';

export const CREATE_AUTHOR = gql`
  ${AUTHOR_DETAILS}
  mutation createAuthor(
    $firstName: String!
    $lastName: String!
    $born: Int
    $profile: String
    $creditText: String
    $creditLink: String
    $annotation: String!
  ) {
    addAuthor(
      firstName: $firstName
      lastName: $lastName
      born: $born
      profile: $profile
      creditText: $creditText
      creditLink: $creditLink
      annotation: $annotation
    ) {
      ...AuthorDetails
    }
  }
`;

export const CREATE_BOOK = gql`
  ${BOOK_DETAILS}
  mutation createBook(
    $authorId: Int!
    $title: String!
    $published: Int
    $annotation: String!
    $genres: [Int!]!
  ) {
    addBook(
      authorId: $authorId
      title: $title
      published: $published
      annotation: $annotation
      genres: $genres
    ) {
      ...BookDetails
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
