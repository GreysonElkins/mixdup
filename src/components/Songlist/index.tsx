import React, { useState, useEffect } from 'react'

import { SpotifyPlaylist, TrackItem } from 'types'
import './Songlist.scss'

type Props = {
  playlist: SpotifyPlaylist
}

const Songlist: React.FC<Props> = ({ playlist }) => {
  const [songs, setSongs] = useState<TrackItem[]>([])

  useEffect(() => {
    if (playlist.tracks?.items) {
      const tracks = playlist.tracks.items.map(({ track }) => track)
      setSongs(tracks)
    }
  }, [playlist.tracks.items])

  const makeSongTiles = () =>
    songs.map(({ name, artists, album }, i) => (
      <div key={`${name}-${i}`} className="song-tile">
        <img src={album.images[0].url} alt={`album art for ${album.name}`} />
        <div className="song-info">
          <span className="song-name">{name}</span>
          <span>{artists?.map((artist) => artist.name).join(', ')}</span>
          <span>{album.name}</span>
        </div>
      </div>
    ))

  return (
    <div className="Songlist">
      <div className="head">
        <div>
          <h1 style={{ color: playlist.primary_color }}>
            {playlist.name}
          </h1>
          <h2>{playlist.description.replace("&#x27;", "'")}</h2>
        </div>
        {playlist.images.length > 0 && (
        <img
          src={playlist.images[1]?.url || playlist.images[0].url}
          alt={`A mosaic of album artwork from the playlist ${playlist.name}`}
        />)}
      </div>
      <div className="songs">
        {makeSongTiles()}
      </div>
    </div>
  )
}

export default Songlist
