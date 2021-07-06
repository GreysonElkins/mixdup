import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify' 
import { faHome } from '@fortawesome/free-solid-svg-icons'

import { getAllPlaylists } from 'scripts'
import { RouteType, SpotifyPlaylist } from 'types'
import './LandingPage.scss'

import { CalendarGraphic, PlaylistGallery } from 'components'
const LandingPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([])

  useEffect(() => {
    getAllPlaylists().then((playlistData) => {
      const { items: playlists } = playlistData || {}
      playlists
        ? setPlaylists(playlists)
        : toast.dark('Something went wrong getting playlists, please try again')
    })
  }, [])

  return (
    <div className="LandingPage">
      <h2>How it Works</h2>
      <CalendarGraphic />
      <div>
        Every week the mix-league makes a new playlist together and votes on their favorites
        together. Each contributor gets to rank their top three songs, but you can't pick songs
        you've heard before.
      </div>
      {playlists && (
        <>
          <h2 className="galleryTitle">All Mixdup Playlists</h2>
          <PlaylistGallery playlists={playlists} />
        </>
      )}
    </div>
  )
} 

const landingPage: RouteType = {
  path: '/',
  component: LandingPage,
  exact: true,
  inNav: {
    name: 'home',
    icon: faHome
  },
}

export default landingPage
