import { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import TokenContext from './TokenContext';

const initialState = {
  user: null,
  loading: false,
  error: null
};

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [token] = useContext(TokenContext);
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

  const [state, dispatchUser] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (loading) {
      dispatchUser({ type: 'FETCH_LOADING' });
    } else if (error) {
      dispatchUser({ type: 'FETCH_ERROR', payload: error });
    } else if (data) {
      dispatchUser({ type: 'FETCH_SUCCESS', payload: data.currentUser });
    }
  }, [loading, error, data]);

  return (
    <UserContext.Provider value={{ state, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
}

// export default UserContext;
