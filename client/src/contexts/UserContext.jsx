import { createContext, useReducer, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import { useTokenValue } from '../hooks/useToken';

const initialState = {
  user: null,
  loading: false,
  error: null
};

export const UserContext = createContext();

export function UserProvider({ children }) {
  const token = useTokenValue();
  const { data, loading, error } = useQuery(CURRENT_USER, {
    skip: !token
  });

  const userReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          ...state,
          user: action.payload,
          loading: false
        };
      case 'FETCH_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case 'FETCH_LOADING':
        return {
          ...state,
          loading: true
        };
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
          loading: false
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (loading) {
      dispatch({ type: 'FETCH_LOADING' });
    } else if (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error });
    } else if (data) {
      dispatch({ type: 'FETCH_SUCCESS', payload: data.currentUser });
    }
  }, [loading, error, data]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
