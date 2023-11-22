import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Card, Typography, IconButton, LinearProgress, Paper, CardMedia } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Jukebox from '../images/Jukebox.png';


const styles =
{
  paperContainer:
  {
    height: 450,
    width: 774,
    backgroundImage: `url(${Jukebox})`
  }
};

export default function MediaPlayer(props)
{
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>
  {
    setIsLoading(false)
  },
  []
  );

  const pauseSong = useCallback(() => {
    const requestOptions =
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  });

  const playSong = useCallback(() => {
    const requestOptions =
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  });

  const skipSong = useCallback(() => {
    const requestOptions =
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  });

  const voteSkipSong = useCallback(() => {
    const requestOptions =
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/vote-skip-song", requestOptions);
  });

  function msToTime(duration)
  {
    var
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 3600)) % 24);

    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return (
      (hours<1 ? "" : hours + ":") +
      (hours<1 ? minutes + ":" : ( minutes<10 ? "0" + minutes + ":" : minutes + ":")) +
      seconds
    );
  }

  const songLength = (Math.floor(props.duration / 1000));
  const songProgress = ((props.time / props.duration) * 100);

  return (
    <Paper style={styles.paperContainer}>
      <Grid container spacing={1}>
        <Card style={{maxHeight:"100", height:"55%", width:"75%", marginTop:"10%", marginLeft:"13.5%"}}>
          <Grid container alignItems="center">
            <Grid item align="center" xs={4}>
              <img src={ props.image_url } height="100%" width="100%" />
            </Grid>

            <Grid item align="center" xs={8}>
              <Typography component="h5" variant="h5">
                { props.title }
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                { props.artist }
              </Typography>
              <div>
                <IconButton onClick={() => { props.is_playing ? pauseSong : playSong }}>
                  {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton onClick={() => skipSong}>
                  <SkipNextIcon/>
                </IconButton>
              </div>
              <Typography>
                Votes to Skip : { props.votes } / {" "} { props.votes_required }
                <IconButton onClick={() => voteSkipSong()}>
                  <ThumbDownAltIcon/>
                </IconButton>
              </Typography>
            </Grid>

          </Grid>

          <LinearProgress variant="determinate" value={ songProgress } style={{maxWidth: "75%"}} />

          <Grid item xs={10} style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginLeft:"50"}}>
            <div>{msToTime(props.time)}</div>
            <div>{msToTime(props.duration)}</div>
          </Grid>

        </Card>
      </Grid>
    </Paper>
  );
}
