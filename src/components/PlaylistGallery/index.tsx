import React from 'react'

import { PlaylistTile } from 'components'
import { SpotifyPlaylist } from 'types'
import './PlaylistGallery.scss'

const PlaylistGallery: React.FC<{playlists: SpotifyPlaylist[]}> = ({ playlists }) => {
  
  const printPlaylists = () => (
    playlists?.map(playlist => (
      <PlaylistTile 
        playlist={playlist} 
        key={`${playlist.id}-tile`} 
      />
    ))
  )

  return <div className="PlaylistGallery">{printPlaylists()}</div>
}

export default PlaylistGallery
