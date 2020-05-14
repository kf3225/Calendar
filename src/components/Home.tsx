import React,{ FC } from "react";
import { Container, Grid } from "@material-ui/core";
// import {  } from "@material-ui/icons";
import Header from "./Header";
import Calendar from "./Calendar";

const Home: FC = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Header />
        <Grid container spacing={2}>
          <Grid item xs></Grid>
          <Grid item xs={8}><Calendar /></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
