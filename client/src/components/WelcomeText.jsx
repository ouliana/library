import Box from '@mui/material/Box';
import { GradientTypography } from '../styles';

function WelcomeText() {
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
export default WelcomeText;
