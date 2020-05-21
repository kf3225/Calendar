import React, { FC } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
// import {  } from "@material-ui/icons";
import Header from './Header';
import CalendarContainer from '../containers/Calendar';

const Home: FC = () => {
  return (
    <>
      <Header />

      <Grid container direction="row">
        <Grid item xs={4} style={{padding: '40px'}}>
          <CalendarContainer />
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </>
  );
};

export default Home;
