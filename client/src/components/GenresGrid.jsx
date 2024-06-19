import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';

import { GridItem } from '../styles';

function GenresGrid({ genres }) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {genres.map(genre => (
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
      ))}
    </Grid>
  );
}

export default GenresGrid;
