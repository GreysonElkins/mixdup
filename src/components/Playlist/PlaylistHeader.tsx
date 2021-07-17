import React from 'react'

import { FollowPlaylistButton } from 'components'
import './Playlist.scss'

type Props = {
  primary_color: string
  name: string
  id: string
  description: string
  images: any[]
}

const PlaylistHeader:React.FC<Props> = ({ id, primary_color, name, description, images }) => {
  return (
    <div className="head">
      <div>
        <h1 style={{ color: primary_color }}>{name}</h1>
        <h2>{description.replace('&#x27;', "'")}</h2>
      </div>
      <div className="right-head">
        {images.length > 0 && (
          <img
          src={images[1]?.url || images[0].url}
          alt={`A mosaic of album artwork from the playlist ${name}`}
          />
          )}
        <FollowPlaylistButton playlist_id={id} />
      </div>
    </div>
  )
}

export default PlaylistHeader