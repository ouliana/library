import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.dark,
        color: 'white',
        padding: '1rem'
      }}
    >
      <Typography variant='caption'>© 2024 Ульяна Котик</Typography>
    </Box>
  );
}

export default Footer;
