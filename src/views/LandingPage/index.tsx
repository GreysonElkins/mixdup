import React from 'react'
import { RouteType } from 'types'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import { CalendarGraphic, PlaylistGallery } from 'components'
const LandingPage: React.FC = () => {
  return (
    <>
      <CalendarGraphic />
      {/* <PlaylistGallery /> */}
    </>
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
