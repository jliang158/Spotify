import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = (props: any) => {
  const { accessToken, trackUri } = props
  if (!accessToken) {
    return null
  }
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
    />
  )
}

export default Player;