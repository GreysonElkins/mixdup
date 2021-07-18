import React, { useState, useEffect } from 'react'

import { 
  SpotifyPlaylist, 
  TrackItem, 
  // EffectProps 
} from 'types'
// import { useScrollPosition } from 'hooks'
import { getPlaylist } from 'scripts'
import { PlaylistWrapper } from 'style'
import PlaylistItems from './PlaylistItems'
import PlaylistHeader from './PlaylistHeader'
import './Playlist.scss'

type Props = {
  playlist: SpotifyPlaylist
}

const Playlist: React.FC<Props> = ({ playlist }) => {
  const [songs, setSongs] = useState<TrackItem[]>([])

  useEffect(() => {
    if (playlist.tracks?.items) {
      const tracks = playlist.tracks.items.map(({ track }) => track)
      setSongs(tracks)
    } else {
      getPlaylist(playlist.id)
        .then(data => {
          const { items } = data.tracks
          const tracks = items.map(({ track }:{ track: TrackItem }) => track)
          setSongs(tracks)
        })
        .catch(error => console.error(error))
    }
  }, [playlist.id, playlist.tracks.items])

  return (
    <>
      <PlaylistWrapper darkBackground>
        <PlaylistHeader {...playlist} />
        {songs.length > 0 && <PlaylistItems songs={songs}/>}
      </PlaylistWrapper>
    </>
  )
}

export { default as FollowPlaylistButton } from './FollowPlaylistButton'
export default Playlist
