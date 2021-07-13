import React, { useState } from 'react'

import { useScrollPosition } from 'hooks'
import { EffectProps } from 'types'
import './Playlist.scss'

type Props = {
  primary_color: string
  name: string
  description: string
  images: any[]
}

const PlaylistHeader:React.FC<Props> = ({ primary_color, name, description, images }) => {
  return (
    <div className="head">
      <div>
        <h1 style={{ color: primary_color }}>{name}</h1>
        <h2>{description.replace('&#x27;', "'")}</h2>
      </div>
      {images.length > 0 && (
        <img
          src={images[1]?.url || images[0].url}
          alt={`A mosaic of album artwork from the playlist ${name}`}
        />
      )}
    </div>
  )
}

export default PlaylistHeader