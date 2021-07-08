import { TrackItem } from 'types'
import { useUser, useCalendar, useModal } from 'hooks'
import { submitSong } from 'scripts'

import './SelectSong.scss'

const SelectSong: React.FC<{selection: TrackItem}> = ({ selection }) => {
  const { today } = useCalendar()
  const { id } = useUser()
  const { closeModal } = useModal()

  return (
    <div className="SelectSong">
      You've picked the song: <span className="song-name">{selection.name}</span>
      <br />
      <br />
      Are you sure that's the one you want to submit for this weeks playlist?
      <br />
      <br />
      <span className="warning">(you won't be able to change it or add another)</span>
      <div>
        <div className="selection-controls">
          <button className="cta-3" onClick={closeModal}>
            cancel
          </button>
          <button
            className="cta-1"
            onClick={(event) => {
              event.preventDefault()
              submitSong(id, selection.uri, selection.name, today)
              closeModal()
            }}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectSong
