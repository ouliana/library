import { gql } from '@apollo/client';

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      firstName
      lastName
    }
    authorId
    published
    genres {
      id
      name
    }
    annotation
    id
  }
`;
export const BOOK_DATA_FOR_TABLE = gql`
  fragment BookDataForTable on Book {
    id
    title
    author {
      firstName
      lastName
    }
    authorId
    published
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
