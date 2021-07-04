import React from 'react'
import { RouteType } from 'types'

const LandingPage: React.FC = () => {
  return <></>
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
