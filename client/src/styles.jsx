import Paper from '@mui/material/Paper';
import { experimentalStyled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ListItemText from '@mui/material/ListItemText';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/system';
import { hexToRGBA } from './utils';

export const BackgroundContainer = styled(Box)(() => ({
  // const Background = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  overflow: 'visible',
  backgroundImage: `url(/background.jpg)`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}));

// export const Overlay = styled(Box)(({ theme }) => ({
export const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(2, 6, 32, 0.5)',
  zIndex: theme.zIndex.overlay
}));
export const OverlaySecondary = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: hexToRGBA(theme.palette.overlay.main, 0.8),
  backdropFilter: 'blur(10px)',
  zIndex: theme.zIndex.overlay
}));

export const DetailsContainer = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  overflow: 'visible'
}));

export const StyledTypographyPrimary = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary
}));

export const StyledTypographySecondary = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    color: theme.palette.text.primary
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary
  }
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    '& .MuiToggleButton-root': {
      '&.Mui-selected': {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        backgroundColor: hexToRGBA(theme.palette.primary.light, 0.2)
      },
      '&.Mui-selected:hover': {
        backgroundColor: hexToRGBA(theme.palette.primary.dark, 0.2)
      }
    }
  })
);

export const StyledToggleButton = styled(ToggleButton)(() => ({
  // export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: '300',
  fontSize: 'small',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem'
}));

export const StyledToolbarButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: hexToRGBA(theme.palette.primary.dark, 0.15)
  }
}));
export const StyledToolbarIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: hexToRGBA(theme.palette.primary.dark, 0.15)
  }
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

export const StyledDrawer = styled(Drawer)(() => ({
  // export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderTopLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    width: '288px',
    alignItems: 'center'
  }
}));
export const StyledDrawerMobile = styled(Drawer)(() => ({
  // export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  '& .MuiPaper-root': {
    width: '100vw',
    alignItems: 'left',
    boxSizing: 'border-box',
    marginTop: '56px'
  }
}));

export const BaseContent = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
  color: '#212121',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center'
}));

export const Content = styled(BaseContent)(() => ({
  padding: '2rem',
  minHeight: 'calc(100vh - 120px)', //64px + 56px
  marginTop: '64px'
}));
export const ContentMobile = styled(BaseContent)(() => ({
  minHeight: 'calc(100vh - 112px)', //56px + 56px
  padding: '1rem',
  marginTop: '56px'
}));

export const ContentCenter = styled(Content)(() => ({
  alignItems: 'center',
  textAlign: 'center'
}));

export const ContentLeft = styled(Content)(() => ({
  alignItems: 'start',
  textAlign: 'left'
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '85%'
  },
  [theme.breakpoints.up('md')]: {
    width: '70%'
  },
  [theme.breakpoints.up('lg')]: {
    width: '65%'
  },
  [theme.breakpoints.up('xl')]: {
    width: '60%'
  }
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
  padding: '2rem'
  // backgroundColor: 'rgba(255, 255, 255, 0.4)',
  // backdropFilter: 'blur(10px)'
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
