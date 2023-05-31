import { gql } from '@apollo/client';

export const ALL_AUTORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
