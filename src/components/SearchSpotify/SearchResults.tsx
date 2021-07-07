import { SearchResultsDefinition, TrackItem, Artist } from 'types'
// import { SelectSong } from 'scripts'
import { useModal } from 'hooks'
import { SelectSong } from 'components'
import './SearchResults.scss'

const SearchResults: React.FC<{results: SearchResultsDefinition}> = ({ results }) => {
  const { setModal } = useModal()

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
        onClick={() => setModal(<SelectSong selection={track}/>)}
        key={`track-${i}`}
      >
        <img
          src={track.album.images[0].url}
          alt={`${track.album.name} art, by ${track.album.artists[0]}`}
        />
        <div id={track.name} className="result-card-text">
            <h4>{track.name}</h4>
            <h5>{mapArtists(track.artists)}</h5>
            <h6>{track.album.name}</h6>
        </div>
      </div>
    ))
  }

  return <div className="SearchResults">{printTracks()}</div>
}

export default SearchResults
