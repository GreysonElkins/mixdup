import React from 'react'

import { PlaylistHeader, PlaylistItems, Votes } from 'components'
import { PlaylistWrapper } from 'style'
import { SpotifyPlaylist } from 'types'

const Voting: React.FC<{playlist: SpotifyPlaylist}> = ({ playlist }) => {
  
  const pulledOutTrackItems = playlist.tracks.items?.map(({ track }) => track) || []

  return (
    <PlaylistWrapper darkBackground>
      <PlaylistHeader {...playlist} />
      <Votes songs={pulledOutTrackItems} />
      <PlaylistItems songs={pulledOutTrackItems} />
    </PlaylistWrapper>
  )
}

export default Voting
