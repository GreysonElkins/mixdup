import React, { useState, useEffect, ReactElement } from 'react'
import { RouteType, SpotifyPlaylist } from 'types'
import { faAward } from '@fortawesome/free-solid-svg-icons'

import { useLeague } from 'hooks'
import { Songlist, HowItWorks } from 'components'
import Submissions from './Submissions'
import { HelpIcon } from 'style'

const LeaguePage: React.FC = () => {
  const [View, setView] = useState<ReactElement<{playlist?: SpotifyPlaylist}> | undefined>(undefined)
  const { mode, thisWeeksPlaylist } = useLeague()
  
  useEffect(() => {
    mode === 'submit' && setView(<Submissions />) 
    thisWeeksPlaylist && mode === 'vote' && setView(<Songlist playlist={thisWeeksPlaylist}/>) // this should be broken out into another view with player and votes
  }, [mode])

  return (
    <>
      {View && View}
      <HelpIcon modal={HowItWorks} />
      {/* HelpIcon is throwing an error */}
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
