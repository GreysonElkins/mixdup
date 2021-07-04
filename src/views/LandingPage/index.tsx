import React from 'react'
import { RouteType } from 'types'

import { CalendarGraphic } from 'components'

const LandingPage: React.FC = () => {
  return <CalendarGraphic />
} 

const landingPage: RouteType = {
  path: '/',
  component: LandingPage,
  exact: true,
  inNav: {
    name: 'home',
  }
}

export default landingPage
