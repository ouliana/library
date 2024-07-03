import { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import SuccessContext from '../contexts/SuccessContext';

function Success() {
  const [success, dispatch] = useContext(SuccessContext);

  useEffect(() => {
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
  });

  if (!success) return null;

  return (
    <Box sx={{ zIndex: 1000, marginTop: '0.5rem' }}>
      <Alert severity='success'>{success}</Alert>
    </Box>
  );
}

export default Success;
