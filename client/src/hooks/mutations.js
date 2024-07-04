import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries';
import { CREATE_AUTHOR, CREATE_BOOK } from '../graphql/mutations';

export const useCreateAuthorMutation = () => {
  const [mutate, { data, loading, error }] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  });

  const executeMutation = async input => {
    try {
      const response = await mutate({ variables: input });
      return response;
    } catch (err) {
      console.error('Mutation error:', err);
      throw err;
    }
  };

  return { executeMutation, data, loading, error };
};

export const useCreateBookMutation = () => {
  const [mutate, { data, loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  });

  const executeMutation = async input => {
    console.log(input);
    try {
      const response = await mutate({ variables: input });
      return response;
    } catch (err) {
      console.error('Mutation error:', err);
      throw err;
    }
  };

  return { executeMutation, data, loading, error };
};
