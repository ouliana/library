import { useContext } from 'react';
import TokenContext from '../contexts/TokenContext';

export function useTokenValue() {
  const tokenAndDispatch = useContext(TokenContext);
  return tokenAndDispatch[0];
}

export function useTokenDispatch() {
  const tokenAndDispatch = useContext(TokenContext);
  return tokenAndDispatch[1];
}
