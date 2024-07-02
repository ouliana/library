import { useContext } from 'react';
import ErrorContext from '../contexts/ErrorContext';

export function useErrorValue() {
  const errorAndDispatch = useContext(ErrorContext);
  return errorAndDispatch[0];
}

export function useErrorDispatch() {
  const errorAndDispatch = useContext(ErrorContext);
  return errorAndDispatch[1];
}
