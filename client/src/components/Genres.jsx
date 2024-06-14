import { useQuery } from '@apollo/client';
import { ALL_GENRES } from '../graphql/queries';

import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';

import { experimentalStyled as styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: 'box-shadow 0.3s, background-color 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#f5f5f5'
  }
}));

function Genres() {
  const { error, data } = useQuery(ALL_GENRES);
  if (error) return `Error! ${error.message}`;

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {data
        ? data.allGenres.map(genre => (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={genre.id}
            >
              <ButtonBase
                component={Link}
                to={`/genres/${genre.id}`}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <Item elevation={1}>{genre.name}</Item>
              </ButtonBase>
            </Grid>
          ))
        : Array.from(new Array(6)).map((_, index) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={index}
            >
              <Skeleton
                variant='rounded'
                width='100%'
                height={80}
              />
            </Grid>
          ))}
    </Grid>
  );
}

export default Genres;
