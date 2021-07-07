import React from 'react'

import { PlaylistTile } from 'components'
import { SpotifyPlaylist } from 'types'
import './PlaylistGallery.scss'

type Props = {
  playlists: SpotifyPlaylist[]
  title?: string
}

const PlaylistGallery: React.FC<Props> = ({ playlists, title }) => {
  
  const printPlaylists = () => (
    playlists?.map(playlist => (
      <PlaylistTile 
        playlist={playlist} 
        key={`${playlist.id}-tile`} 
      />
    ))
  )

  return (
    <>
      {title && <h2 className="gallery-title">{title}</h2>}
      <div className="PlaylistGallery">{printPlaylists()}</div>
    </>
  )
}

export default PlaylistGallery
