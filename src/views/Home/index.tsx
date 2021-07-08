import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify' 
import { faHome } from '@fortawesome/free-solid-svg-icons'

import { getAllPlaylists } from 'scripts'
import { RouteType, SpotifyPlaylist } from 'types'
import './HomePage.scss'

import { PlaylistGallery } from 'components'
const HomePage: React.FC = () => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([])

  useEffect(() => {
    getAllPlaylists().then((playlistData) => {
      const { items: playlists } = playlistData || {}
      playlists
        ? setPlaylists(playlists)
        : toast.dark('Something went wrong getting playlists, please try again', {
            toastId: 'Error getting playlists',
          })
    })
  }, [])

  return (
    <div className="HomePage">
      {playlists && <PlaylistGallery playlists={playlists} title="All Mixdup Playlists" />}
    </div>
  )
} 

const homePage: RouteType = {
  path: '/',
  component: HomePage,
  exact: true,
  inNav: {
    name: 'home',
    icon: faHome
  },
}

export default homePage
