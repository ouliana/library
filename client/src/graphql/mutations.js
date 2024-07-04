import { gql } from '@apollo/client';
import { AUTHOR_DETAILS, BOOK_DETAILS } from './fragments';

export const CREATE_AUTHOR = gql`
  ${AUTHOR_DETAILS}
  mutation CreateAuthor(
    $firstName: String!
    $lastName: String!
    $born: Int
    $profile: String
    $creditText: String
    $creditLink: String
    $annotation: String!
  ) {
    createAuthor(
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

export const UPDATE_AUTHOR = gql`
  ${AUTHOR_DETAILS}
  mutation UpdateAuthor(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $born: Int
    $profile: String
    $creditText: String
    $creditLink: String
    $annotation: String!
  ) {
    updateAuthor(
      id: $id
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
  mutation CreateBook(
    $authorId: ID!
    $title: String!
    $published: Int
    $annotation: String!
    $genres: [ID!]!
  ) {
    createBook(
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
