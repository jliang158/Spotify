import {useState, useEffect} from 'react';
import useAuth from '../useAuth';
import Box from '@mui/material/Box';
import { FormControl, Input } from '@mui/material';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import axios from 'axios';
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: "ca720306eb134a42abd5463d72b5a1ff",
})

type Props = {
  code: any;
}

const Dashboard = (props: Props) => {
  const {code} = props;
  const accessToken = useAuth(code)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState<any>()
  const [lyrics, setLyrics] = useState('')


  const chooseTrack = (track: any) => {
    setPlayingTrack(track)
    setSearch('')
    setLyrics('')
  }

  useEffect(() => {
    if (!playingTrack) return
    axios.get('http://localhost:3001/lyrics', {
      params:{
        track: playingTrack.title,
        artist: playingTrack.artist
      }
    }).then(res => {
      setLyrics(res.data.lyrics)
    })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) {
      return setSearchResults([])
    }
    if (!accessToken) {
      return
    }
    // let cancel = false;
    spotifyApi.searchTracks(search).then((res: any) => {
      console.log(res)
      // if (cancel) {
      //   return
      // }
      setSearchResults(res.body.tracks.items.map((track: any) => {
        const smallestAlbumImage = track.album.images.reduce((smallest: any, image: any) => {
          if (image.height < smallest.height) return image
          return smallest
        }, track.album.images[0])
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url
        }
      })
      )
    })
    // cancel = true;
    return;
  }, [search, accessToken])

  return (
    <Box className='Box'>
      <FormControl>
        <Input placeholder='Search Songs/Artists' onChange={(e) => {setSearch(e.target.value); console.log(e.target.value)}} value={search}></Input>
      </FormControl>
      <Box className='List'>{searchResults.map((track, i) => (
        <TrackSearchResult track={track} key={i} chooseTrack={chooseTrack}/>
      ))}
      {searchResults.length === 0 && (
        <Box className='lyrics'>{lyrics}</Box>
      )}
      </Box>
      <Box>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </Box>
    </Box>
  )
}

export default Dashboard;