import React, { useState, useCallback } from 'react';
import { Button, Grid, Typography, TextField } from '@mui/material'
import { useNavigate } from "react-router-dom";

function JoinRoomPage(props)
{
  const [roomCode, setRoomCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const updateRoomCode = e => setRoomCode(e.target.value);

  const roomButtonPressed = useCallback(() =>
  {
    const requestOptions =
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        code: roomCode
      }),
    };
    fetch('/api/join-room', requestOptions)
      .then(response =>
      {
        if (response.ok)
        {
          navigate(`/room/${roomCode}`);
        }
        else
        {
          setErrorMessage("Room not found.")
        }
      })
    .catch(error => {
        console.log(errorMessage);
    });
  },
  [roomCode, errorMessage],
  );

  return (
    <Grid container spacing={1} alignItems="center">

      <Grid item xs={12} align="center" justifyContent="center">
        <Typography>
          Join A Room
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <TextField
          error={ errorMessage === "" ? false: true }
          label="Room Code"
          placeholder="Enter A Room Code"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          value={ roomCode }
          helperText={ errorMessage }
          variant="filled"
          onChange={ (e) => setRoomCode(e.target.value) }
         />
      </Grid>

      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={ roomButtonPressed }>
          Enter Room
        </Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={ Link }>
          Back
        </Button>
      </Grid>

    </Grid>
  );
}

export default JoinRoomPage;