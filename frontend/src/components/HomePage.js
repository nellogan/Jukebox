import React from 'react';
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';

function RenderHomePage()
{
  return (
    <Grid container spacing={3}>

      <Grid item xs={12} align="center">
        <Typography variant="h2" compact="h2">
          Jukebox
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>

    </Grid>
  );
};

function HomePage(props)
{
  return (
    RenderHomePage()
  );
};

export default HomePage;