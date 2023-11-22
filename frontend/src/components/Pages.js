import React, { useState, useEffect, useCallback } from 'react';
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import HomePage from "./HomePage"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const customTheme = createTheme(
{
  palette:
  {
    primary:
    {
      main: '#89c68f'
    },
    secondary:
    {
      main: '#fd976b'
    },
    error:
    {
      main: '#fc2112'
    },
    warning:
    {
      main: '#ffd149'
    },
    info:
    {
      main: '#9c786c'
    },
    success:
    {
      main: '#64ba5b'
    },
  }
});


function Pages(props)
{
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() =>
  {
    function getData()
    {
      fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) =>
      {
        if (data.code)
        {
         setRoomCode(data.code);
        }
        else
        {
          setRoomCode(null);
        }
      })
    }
  },
  [roomCode],
  );

  const clearRoomCode = useCallback(() =>
  {
    setRoomCode(null);
  },
  [],
  );

  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Routes>
          <Route path='' element={
            roomCode ? <Navigate to={`/room/${roomCode}`} /> : <HomePage />
          } />
          <Route path='/join' element={ <JoinRoomPage/> } />
          <Route path='/create' element={ <CreateRoomPage roomCode={roomCode}/> } />
          <Route path='/room/:roomCode' element={ <Room leaveRoomCallback={clearRoomCode} /> } />
        </Routes>
      </Router>
    </ThemeProvider>
  );

};

export default Pages;
