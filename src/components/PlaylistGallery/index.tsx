import React from 'react'
import { Link } from 'react-router-dom'

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
      <Link 
        to={{
          pathname: `/playlist`,
          state: { playlist }
        }} 
        key={`${playlist.id}-tile`}
      >
        <PlaylistTile playlist={playlist} />
      </Link>
    ))
  )

  return (
    <>
      {title && playlists.length > 0 && <h2 className="gallery-title">{title}</h2>}
      <div className="PlaylistGallery">{printPlaylists()}</div>
    </>
  )
}

export default PlaylistGallery
