import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core";

import Timer from "../components/timer";
const useStyles = makeStyles({
  appBar: {
    top: "auto",
    bottom: 0
  }
});

export default function Home() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={false} md={3}></Grid>
      <Grid item xs={12} md={6}>
        <Timer />
      </Grid>
      <Grid item xs={false} md={3}></Grid>
      <Grid container>
        <AppBar position="fixed" className={classes.appBar}>
          <p>ABV</p>
        </AppBar>
      </Grid>
    </Grid>
  );
}
