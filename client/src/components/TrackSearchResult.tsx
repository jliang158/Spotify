import { Box, width } from '@mui/system';
import { useState, useEffect} from 'react';

const TrackSearchResult = (props: any) => {
  const { track, chooseTrack } = props;

  const handlePlay = () => {
    chooseTrack(track)
  }
  return (
    <Box className="TrackSearchResults">
      <img src={track.albumUrl} style={{height:'64px', width:'64px'}} alt="images"/>
      <Box className="TitleName">
        <Box className="title">{track.title}</Box>
        <Box className="artist">{track.artist}</Box>
      </Box>
    </Box>
  )
}

export default TrackSearchResult;