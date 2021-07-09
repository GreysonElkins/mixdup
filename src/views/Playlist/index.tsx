import React from 'react'

import { RouteWithProps, SpotifyPlaylist } from 'types'
import { Songlist } from 'components'

const PlaylistPage: React.FC<{playlist: SpotifyPlaylist}> = ({ playlist }) => {
  return <Songlist playlist={playlist} />
}

const playlistPage: RouteWithProps = {
  path: '/playlist',
  render: ({ location }) => {
    const { state } = location
    return <PlaylistPage playlist={state.playlist} />
  }, 
}

export default playlistPage