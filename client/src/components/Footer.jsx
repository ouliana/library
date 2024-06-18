import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

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
      © 2024 Ульяна Котик
    </Box>
  );
}

export default Footer;
