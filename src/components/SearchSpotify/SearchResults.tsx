import { SearchResultsDefinition, TrackItem, Artist } from 'types'
import './SearchResults.scss'

const SearchResults: React.FC<{
  results: SearchResultsDefinition
  setSelection: (value: TrackItem) => void
}> = ({ results, setSelection }) => {

  const sortTracksByPopularity = (items: TrackItem[]): TrackItem[] => {
    return items.sort((a: TrackItem, b: TrackItem) => b.popularity - a.popularity)
  }

  const mapArtists = (artists: Artist[]) => {
    if (artists.length === 1) {
      return artists[0].name
    } else {
      const names = artists.map((artist) => artist.name)
      return names.join(', ')
    }
  }

  const printTracks = () => {
    const sorted = sortTracksByPopularity(results.tracks.items)
    return sorted.map((track: TrackItem, i) => (
      <div
        className="result-card"
        onClick={() => {
          setSelection(track)
        }}
        key={`track-${i}`}
      >
        <img
          src={track.album.images[2].url}
          alt={`${track.album.name} art, by ${track.album.artists[0]}`}
        />
        <div id={track.name} className="result-card-text">
          <div className="row">
            <h4>{track.name}</h4>
          </div>
          <div className="row">
            <h5>{mapArtists(track.artists)}</h5>
            <h6>{track.album.name}</h6>
          </div>
        </div>
      </div>
    ))
  }

  return <div className="SearchResults">{printTracks()}</div>
}

export default SearchResults
