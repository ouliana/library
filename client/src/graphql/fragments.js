import { gql } from '@apollo/client';

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author
    authorId
    published
    genres
    annotation
    id
  }
`;

export const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    firstName
    lastName
    born
    profile
    creditText
    creditLink
    annotation
  }
`;
