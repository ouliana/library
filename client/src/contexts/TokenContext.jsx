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

// export function useTokenValue() {
//   const tokenAndDispatch = useContext(TokenContext);
//   return tokenAndDispatch[0];
// }

// export function useTokenDispatch() {
//   const tokenAndDispatch = useContext(TokenContext);
//   return tokenAndDispatch[1];
// }

export function TokenContextProvider(props) {
  const [token, tokenDispatch] = useReducer(tokenReducer, null);

  return (
    <TokenContext.Provider value={[token, tokenDispatch]}>
      {props.children}
    </TokenContext.Provider>
  );
}

export default TokenContext;
