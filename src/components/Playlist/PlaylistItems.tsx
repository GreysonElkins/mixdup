import { TrackItem } from "types"

import './Playlist.scss'

const PlaylistItems:React.FC<{songs: TrackItem[]}> = ({ songs }) => {
  const makeSongTiles = () =>
    songs.map(({ name, artists, album }, i) => (
      <div key={`${name}-${i}`} className="song-tile">
        <img src={album.images[0].url} alt={`album art for ${album.name}`} />
        <div className="song-info">
          <span className="song-name">{name}</span>
          <span>{artists?.map((artist) => artist.name).join(', ')}</span>
        </div>
      </div>
    ))
    
    return <div className="songs">{makeSongTiles()}</div>
}

export default PlaylistItems