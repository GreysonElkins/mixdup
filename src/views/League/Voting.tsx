import React from 'react'

import { PlaylistHeader, PlaylistItems, Votes } from 'components'
import { SpotifyPlaylist } from 'types'

const Voting: React.FC<{playlist: SpotifyPlaylist}> = ({ playlist }) => {
  
  const pulledOutTrackItems = playlist.tracks.items?.map(({ track }) => track) || []

  return (
    <>
      <PlaylistHeader {...playlist} />
      <Votes songs={pulledOutTrackItems} />
      <PlaylistItems songs={pulledOutTrackItems} />
    </>
  )
}

export default Voting
