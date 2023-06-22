import { gql } from '@apollo/client';

export const BOOK_DETAILS = gql`
  fragment BookDetaiks on Book {
    title
    author
    published
    genres
  }
`;
