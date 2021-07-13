import React from 'react'

import { RouteWithProps, SpotifyPlaylist } from 'types'
import { Playlist } from 'components'

const PlaylistPage: React.FC<{playlist: SpotifyPlaylist}> = ({ playlist }) => {
  return <Playlist playlist={playlist} />
}

const playlistPage: RouteWithProps = {
  path: '/playlist',
  render: ({ location }) => {
    const { state } = location
    return <PlaylistPage playlist={state.playlist} />
  }, 
}

export default playlistPage