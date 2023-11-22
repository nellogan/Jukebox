import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, Typography, TextField, FormHelperText,
 FormControl, Radio, RadioGroup, FormControlLabel, Collapse } from '@mui/material'
import { useNavigate, Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

function wait(ms)
{
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms)
   {
     end = new Date().getTime();
   }
}

function CreateRoomPage(props)
{
  const navigate = useNavigate();

  const [votesToSkip, setVotesToSkip] = useState(1);
  const [currentVotesToSkip, setCurrentVotesToSkip] = useState(0);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [roomCode, setRoomCode] = useState(props.roomCode);
  const [update, setUpdate] = useState(props.update);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);

  useEffect(() =>
  {
    if (!spotifyAuthenticated)
    {
      authenticateSpotify();
    }
  },
  [roomCode, votesToSkip, guestCanPause, currentVotesToSkip]
  );

  const handleVotesChange = e => setVotesToSkip(e.target.value);

  const handleGuestCanPauseChange = e => setGuestCanPause(e.target.value);

  const authenticateSpotify = useCallback(() =>
  {
    if (!spotifyAuthenticated)
    {
      fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) =>
      {
        if (!data.status)
        {
          fetch("/spotify/get-auth-url")
          .then((response) => response.json())
          .then((data) => {
            window.location.replace(data.url);
          });
        }
        else
        {
          setSpotifyAuthenticated(true);
        }
      });
    }
  },
  [spotifyAuthenticated],
  );

  const handleRoomButtonPressed = useCallback(() =>
  {
    authenticateSpotify();

    const requestOptionsCheck =
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const requestOptions =
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
      {
        votes_to_skip: votesToSkip,
        current_votes_to_skip: currentVotesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    fetch('/api/user-in-room', requestOptionsCheck)
    .then((response) =>
    {
      if (response.code)
      {
        console.log("User already in room, redirecting");
        navigate(`/room/${data.code}`);
      }
      else
      {
        fetch('/api/create-room', requestOptions)
        .then((response) => response.json())
        .then((data) =>
        {
          setRoomCode(data.code);
          navigate(`/room/${data.code}`);
        });
      }
    });
  },
  [votesToSkip, currentVotesToSkip, guestCanPause],
  );

  function renderCreateButton()
  {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={ handleRoomButtonPressed }
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  function renderUpdateButton()
  {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={ handleUpdateButtonPressed }
        >
          Update Room
        </Button>
      </Grid>
    );
  }

  const handleUpdateButtonPressed = useCallback(() =>
  {
    const requestOptions_0 =
    {
      method: "GET",
      "Content-Type": "application/json"
    };
    setUpdate(true);
    fetch("/api/update-room", requestOptions_0)
    .then((response) =>
    {
      if (!response.ok) {
        setErrorMsg("Error: Could not get room data!");
        return {'Error':'Could not get room data!'}
      }
      else
      {
        return response.json();
      }
    })
    .then((response) =>
    {
      const requestOptions_1 =
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
        {
          votes_to_skip: votesToSkip,
          guest_can_pause: guestCanPause,
          current_votes_to_skip: response.current_votes_to_skip,
          code: props.roomCode,
        }),
      };
      const res_1 = fetch("/api/update-room", requestOptions_1)
      .then(() => setCurrentVotesToSkip(response.current_votes_to_skip));
    })
    .then(() =>
    {
      setSuccessMsg("Successfully updated settings, press close to return to room");
    });
  },
  [votesToSkip, guestCanPause, currentVotesToSkip, roomCode],
  );

  return (
    <Grid container spacing={1}>

      <Grid item xs={12} align="center">
        <Collapse
          in={ successMsg != "" }>
          <Alert
            severity="success"
            onClose={() => {
              setSuccessMsg("");
            }}
          >
            {successMsg}
          </Alert>
        </Collapse>
        <Collapse
          in={ errorMsg != "" }>
          <Alert
            severity="error"
            onClose={() => {
                setErrorMsg("");
            }}
          >
            {errorMsg}
          </Alert>
        </Collapse>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          { update ? "Update Room" : "Create a Room" }
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <FormHelperText style={{textAlign:"center"}}>
            Guest Control of Play/Pause
          </FormHelperText>
          <RadioGroup
            row
            value={guestCanPause.toString()}
            onChange={ handleGuestCanPauseChange }
            >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" disableRipple/>}
              label="Enabled"
              style={{color:"blue"}}
              labelPlacement="bottom"
              />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary"/>}
              label="Disabled"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={ handleVotesChange }
            defaultValue={ votesToSkip }
            style={{textItems:"right", backgroundColor:"purple"}}
            inputProps={{
              min: 1,
              style:{color:"white", textAlign:"center"}
            }}
          />
          <FormHelperText style={{textAlign:"center"}}>
            Votes Required To Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>
    { update ? renderUpdateButton() : renderCreateButton() }
    </Grid>
  );
}

export default CreateRoomPage;