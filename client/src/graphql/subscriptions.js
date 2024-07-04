import { gql } from '@apollo/client';
import { AUTHOR_DETAILS, BOOK_DETAILS } from './fragments';

export const AUTHOR_CREATED = gql`
  ${AUTHOR_DETAILS}
  subscription {
    authorCreated {
      ...AuthorDetails
    }
  }
`;
export const AUTHOR_UPDATED = gql`
  ${AUTHOR_DETAILS}
  subscription {
    authorUpdated {
      ...AuthorDetails
    }
  }
`;
export const BOOK_CREATED = gql`
  ${BOOK_DETAILS}
  subscription {
    bookCreated {
      ...BookDetails
    }
  }
`;
