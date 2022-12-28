import React from 'react';
import Button from '@mui/material/Button';
import './style.scss';
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=ca720306eb134a42abd5463d72b5a1ff&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const Login = () => {
  return (
    <div className='Login'>
      <h1>hello</h1>
      <Button variant="outlined" href={AUTH_URL}>Login With Spotify</Button>
    </div>
  )
}

export default Login;