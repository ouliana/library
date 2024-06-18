import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import {
  BackgroundContainer,
  Overlay,
  Content,
  GradientTypography
} from '../styles';

function Main() {
  return (
    <BackgroundContainer>
      <Overlay />
      <Content>
        <Box sx={{ textAlign: 'center' }}>
          <GradientTypography
            variant='h3'
            sx={{ fontWeight: 300 }}
            gutterBottom
          >
            Добро пожаловать в Мини-библиотеку!
          </GradientTypography>
        </Box>
      </Content>
    </BackgroundContainer>
  );
}

export default Main;
