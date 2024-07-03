import { createContext, useReducer } from 'react';

function successReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
}

const SuccessContext = createContext();

export function SuccessContextProvider(props) {
  const [success, dispatch] = useReducer(successReducer, '');

  return (
    <SuccessContext.Provider value={[success, dispatch]}>
      {props.children}
    </SuccessContext.Provider>
  );
}

export default SuccessContext;
