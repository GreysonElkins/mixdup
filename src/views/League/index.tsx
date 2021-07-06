import React from 'react'
import { RouteType } from 'types'
import { faAward } from '@fortawesome/free-solid-svg-icons'

import Submissions from './Submissions'

const LeaguePage: React.FC = () => <><Submissions /></>

const league: RouteType = {
  path: '/mix-league',
  component: LeaguePage,
  exact: true,
  inNav: {
    name: 'mix league',
    icon: faAward,
  },
}

export default league
