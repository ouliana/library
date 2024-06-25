import Paper from '@mui/material/Paper';
import { experimentalStyled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
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

export const StyledIconButton = styled(IconButton)(() => ({
  // export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'opacity ease-in-out 300ms',
  '&:hover': {
    opacity: '0.8'
  },
  padding: 0,
  borderRadius: '50%'
}));

export const StyledToggleButton = styled(ToggleButton)(() => ({
  // export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: '300',
  fontSize: 'small',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem'
}));

export const StyledDrawer = styled(Drawer)(() => ({
  // export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    // borderRadius: '16px',
    borderTopLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    width: '288px',
    // padding: '1rem',
    alignItems: 'center'
  }
}));
export const StyledDrawerMobile = styled(Drawer)(() => ({
  // export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  '& .MuiPaper-root': {
    width: '100vw',
    // padding: '1rem',
    alignItems: 'left',
    boxSizing: 'border-box',
    marginTop: '56px'
  }
}));

export const Content = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
  color: '#212121',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minHeight: 'calc(100vh - 120px)',
  padding: '2rem'
}));

export const ContentCenter = styled(Content)(() => ({
  alignItems: 'center',
  textAlign: 'center'
}));

export const ContentLeft = styled(Content)(() => ({
  alignItems: 'start',
  textAlign: 'left'
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

export const GridItem = experimentalStyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: 'box-shadow 0.3s, background-color 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#efefef'
    // backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#f5f5f5'
  }
}));
