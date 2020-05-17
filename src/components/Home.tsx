import React,{ FC } from "react";
import { Container, Grid } from "@material-ui/core";
// import {  } from "@material-ui/icons";
import Header from "./Header";
import CalendarContainer from "../containers/Calendar";

const Home: FC = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Header />
        <Grid container>
          <Grid item xs><CalendarContainer /></Grid>
          <Grid item xs={8}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
