import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'


import { useSpotify } from 'hooks'

import './Playlist.scss'

const FollowPlaylistButton: React.FC<{playlist_id: string}> = ({ playlist_id }) => {
  const { followPlaylist } = useSpotify()
  return (
    <button  
      className="follow-playlist" 
      onClick={event => {
        event.preventDefault()
        followPlaylist(playlist_id)
      }}
    >
      <FontAwesomeIcon icon={faUserPlus} />
      Follow
    </button>
  )
}

export default FollowPlaylistButton