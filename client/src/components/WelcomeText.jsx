import { useContext } from 'react';
import TokenContext from '../contexts/TokenContext';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { GradientTypography } from '../styles';

function WelcomeText() {
  // eslint-disable-next-line no-unused-vars
  const [token, dispatch] = useContext(TokenContext);

  if (!token) {
    return (
      <Box sx={{ textAlign: 'center', paddingTop: '4rem' }}>
        <GradientTypography
          variant='h3'
          sx={{ fontWeight: 300 }}
          gutterBottom
        >
          Добро пожаловать в Мини-библиотеку!
        </GradientTypography>
      </Box>
    );
  }

  return <Stack>Любимые произведения </Stack>;
}
export default WelcomeText;
