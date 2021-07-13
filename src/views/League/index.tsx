import React, { useState, useEffect, ReactElement } from 'react'
import { RouteType, SpotifyPlaylist } from 'types'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

import { useLeague } from 'hooks'
import { HowItWorks } from 'components'
import Submissions from './Submissions'
import Voting from './Voting'
import { HelpIcon } from 'style'

const LeaguePage: React.FC = () => {
  const [View, setView] = useState<ReactElement<{playlist?: SpotifyPlaylist}> | undefined>(undefined)
  const { mode, thisWeeksPlaylist } = useLeague()
  
  useEffect(() => {
    mode === 'submit' && setView(<Submissions />) 
    thisWeeksPlaylist && mode === 'vote' && setView(<Voting playlist={thisWeeksPlaylist}/>) // this should be broken out into another view with player and votes
  }, [mode, thisWeeksPlaylist])

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
    icon: faTrophy,
  },
}

export default league
