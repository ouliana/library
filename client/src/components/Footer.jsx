// import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

function Footer() {
  // const theme = useTheme();
  return (
    <Box
      sx={{
        // borderTop: '1px solid #424242',
        // bgcolor: theme.palette.primary.dark,
        // bgcolor: theme.palette.primary.dark,
        padding: '1rem'
      }}
    >
      <Typography variant='caption'>© 2024 Ульяна Котик</Typography>
    </Box>
  );
}

export default Footer;
