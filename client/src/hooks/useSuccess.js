import { useContext } from 'react';
import SuccessContext from '../contexts/SuccessContext';

export function useSuccessValue() {
  const successAndDispatch = useContext(SuccessContext);
  return successAndDispatch[0];
}

export function useSuccessDispatch() {
  const successAndDispatch = useContext(SuccessContext);
  return successAndDispatch[1];
}
