import React from 'react'

import { SpotifyPlaylist } from 'types'
import './PlaylistTile.scss'

const EmptyPlaylistTile = () => (
  <div className="EmptyTile">
    <img src="/headphones.svg" alt="the app logo, a cartoon pair of headphones" />
  </div>
)

const PlaylistTile: React.FC<{ playlist: SpotifyPlaylist }> = ({ playlist }) => {
  const getImage = () => {
    return playlist.images.length > 0 ? (
      <img
        src={playlist.images[1]?.url || playlist.images[0].url}
        alt={`A mosaic of album artwork from the playlist ${playlist.name}`}
      />
    ) : (
      <EmptyPlaylistTile />
    )
  }
  return (
    <div className="PlaylistTile">
      {getImage()}
      <span>{playlist.name}</span>
    </div>
  )
}

export default PlaylistTile