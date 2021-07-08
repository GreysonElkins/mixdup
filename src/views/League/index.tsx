import React, { useState, useEffect, ReactElement } from 'react'
import { RouteType } from 'types'
import { faAward } from '@fortawesome/free-solid-svg-icons'

import { useLeague } from 'hooks'
import { HowItWorks } from 'components'
import Submissions from './Submissions'
import { HelpIcon } from 'style'

const LeaguePage: React.FC = () => {
  const [View, setView] = useState<ReactElement | undefined>(undefined)
  const { mode } = useLeague()
  
  useEffect(() => {
    mode === 'vote' ? setView(undefined) : setView(<Submissions />) 
  }, [mode])

  return (
    <>
      {View && View}
      <HelpIcon modal={HowItWorks} />
    </>
  )
}

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
