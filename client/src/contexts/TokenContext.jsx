import { createContext, useReducer } from 'react';

function tokenReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
}

const TokenContext = createContext();

export function TokenContextProvider(props) {
  const [token, dispatch] = useReducer(tokenReducer, null);

  return (
    <TokenContext.Provider value={[token, dispatch]}>
      {props.children}
    </TokenContext.Provider>
  );
}

export default TokenContext;
