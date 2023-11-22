import React, { useState, useEffect, useCallback } from "react";
import { Grid, Button, Typography, Backdrop, CircularProgress, Card } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";
import MediaPlayer from "./MediaPlayer";
import { useNavigate, useParams } from 'react-router-dom';

function Room(props)
{
  let params = useParams();
  const navigate = useNavigate();

  const [votesToSkip, setVotesToSkip] = useState(1);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [currentVotesToSkip, setCurrentVotesToSkip] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomCode, setRoomCode] = useState(params.roomCode);
  const [count, setCount] = useState(0);

  // get room details only once
  useEffect(() =>
  {
    getRoomDetails();
  },
  [],
  );

  //polling method -- continuously getCurrentSong()
  useEffect(() =>
  {
    setIsLoading(false);
    const interval = setInterval(() =>
    {
      getCurrentSong();
      setCount(count + 1);
    }, 1000);
    //Clearing the interval
    return () => clearInterval(interval);
  },
  [count]
  );

  const getRoomDetails = useCallback(() =>
  {
    return fetch("/api/get-room" + "?code=" + roomCode)
    .then((response) =>
    {
      if (!response.ok)
      {
        navigate("/");
      }
      return response.json();
    })
    .then((data) =>
    {
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setCurrentVotesToSkip(data.current_votes_to_skip);
      setIsHost(data.is_host);
      if (isHost)
      {
        authenticateSpotify();
      }
    });
  });

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

  const getCurrentSong = useCallback(() =>
  {
    fetch("/spotify/current-song")
    .then((response) =>
    {
      if (!response.ok || response.Error)
      {
        console.log("Current song not found, leaving room and redirecting to homepage.");
        navigate("/");
        return {'Error':'Could not get current song!'};
      }
      else
      {
        return response.json();
      }
    })
    .then((data) =>
    {
      setSong(data);
    });
  });

  const leaveButtonPressed = useCallback(() =>
  {
    const requestOptions =
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((response) =>
    {
      navigate("/");
    });

  });

  function renderSettings()
  {
    return (
      <Grid container spacing={1}>

        <Grid item xs={12} align="center">
          <CreateRoomPage
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={params.roomCode}
            update={true}
          />
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowSettings(false)}
          >
            Close
          </Button>
        </Grid>

      </Grid>
    );
  }

  function renderSettingsButton()
  {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  if (showSettings)
  {
    return renderSettings();
  }
  else
  {
    return (
      <Grid container spacing={1} align="center">
        <Grid item xs={12} >
          <Typography variant="h4" component="h4" color="secondary">
            Room Code: { roomCode }
          </Typography>
        </Grid>

        <Grid container spacing={1} align="center">
          <Grid item xs={12}>
            { song ?
              (
                <MediaPlayer {...song} />
              )
              :
              (
                <CircularProgress align="center"/>
              )
            }
          </Grid>
        </Grid>

        { isHost ?  renderSettingsButton() : null }

        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={ leaveButtonPressed }
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Room;