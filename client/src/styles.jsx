import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

export const BackgroundContainer = styled(Box)(() => ({
  // const Background = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  // minHeight: '100vh',
  overflow: 'visible',
  backgroundImage: `url(/background.jpg)`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}));

// export const Overlay = styled(Box)(({ theme }) => ({
export const Overlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1
}));
export const OverlaySecondary = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10px)',
  zIndex: 1
}));

// export const Content = styled(Box)(({ theme }) => ({
export const Content = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
  color: 'white',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: 'calc(100vh - 120px)'
}));
export const ContentSecondary = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
  color: 'inherit',
  textAlign: 'center',
  // paddingTop: '20vh'
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: 'calc(100vh - 120px)' //64px + 56px
}));

export const LoginPage = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '128px'
}));

// export const GradientText = styled(Typography)(({ theme }) => ({
export const GradientText = styled(Typography)(() => ({
  background: 'linear-gradient(0deg, #cddc39 30%, #ff6f00 90%)', // Define your gradient here
  // background: 'linear-gradient(45deg, #cddc39 30%, #ff6f00 90%)', // Define your gradient here
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent'
}));

export const GradientTypography = ({ children, ...props }) => {
  return <GradientText {...props}>{children}</GradientText>;
};

export const Panel = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '400px',
  padding: '2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10px)'
}));
