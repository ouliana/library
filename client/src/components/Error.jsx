import { useContext } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ErrorContext from '../contexts/ErrorContext';

function Error() {
  const [error, dispatch] = useContext(ErrorContext);
  if (!error) return null;

  let message = ';';
  switch (error.message) {
    case 'Response not successful: Received status code 500': {
      message = 'Не удалось связаться с сервером';
      break;
    }
    default: {
      message = error.message;
    }
  }
  return (
    <Box sx={{ zIndex: 1000, marginTop: '0.5rem' }}>
      <Alert
        severity='error'
        onClose={() => {
          dispatch({
            type: 'CLEAR'
          });
        }}
      >
        {message}
      </Alert>
    </Box>
  );
}

export default Error;
