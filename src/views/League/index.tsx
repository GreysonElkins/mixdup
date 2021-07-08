import React from 'react'
import { RouteType } from 'types'
import { faAward } from '@fortawesome/free-solid-svg-icons'

import { HowItWorks } from 'components'
import Submissions from './Submissions'
import { HelpIcon } from 'style'

const LeaguePage: React.FC = () => (
  <>
    <Submissions />
    <HelpIcon modal={HowItWorks} />
  </>
)

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
