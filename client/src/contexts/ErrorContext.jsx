import { createContext, useReducer } from 'react';

function errorReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
}

const ErrorContext = createContext();

export function ErrorContextProvider(props) {
  const [error, dispatch] = useReducer(errorReducer, null);

  return (
    <ErrorContext.Provider value={[error, dispatch]}>
      {props.children}
    </ErrorContext.Provider>
  );
}

export default ErrorContext;
