import React, { FC } from 'react';
import { Grid, Button, Container } from '@material-ui/core';
import {} from '@material-ui/icons';

const Header: FC<{}> = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Header;
