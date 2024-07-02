import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_GENRES } from '../graphql/queries';

import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Skeleton from '@mui/material/Skeleton';

import { GridItem, StyledBox } from '../styles';

import { useErrorDispatch } from '../hooks/useError';

function Genres() {
  const { error, data } = useQuery(ALL_GENRES);
  const errorDispatch = useErrorDispatch();
  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  return (
    <StyledBox>
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
                  <GridItem elevation={1}>{genre.name}</GridItem>
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
    </StyledBox>
  );
}

export default Genres;
