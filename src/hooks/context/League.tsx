import { createContext, useContext, useEffect, useState } from 'react'
import { getDay } from 'date-fns'
import { ruleOfTheDay } from 'scripts'
import { DayAction, Day, LeagueContextType, SpotifyPlaylist } from 'types'
import { getRelevantPlaylist } from 'scripts'
import { useCalendar } from 'hooks'

const LeagueContext = createContext({} as LeagueContextType)

export const LeagueProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<'vote' | 'submit' | 'loading'>('loading') // might not need loading
  const [thisWeeksPlaylist, setThisWeeksPlaylist] = useState<SpotifyPlaylist | undefined>()
  const [votingStarts] = useState<DayAction>({ start: Day.WED, action: 'vote' })
  const [submissionsStart] = useState<DayAction>({ start: Day.SUN, action: 'submit' })
  const { today } = useCalendar()

  useEffect(() => {
    getRelevantPlaylist(today)
      .then(playlist => {
        playlist && setThisWeeksPlaylist(playlist)
        console.log(playlist)
      })
      .catch(error => console.error(error))
  }, [today])

  useEffect(() => {
    const rule = ruleOfTheDay({
      day: getDay(today),
      actions: [votingStarts, submissionsStart],
    })
    setMode(rule)
  }, [submissionsStart, today, votingStarts])

  return (
    <LeagueContext.Provider
      value={{ mode, loading: mode === 'loading', rules: [votingStarts, submissionsStart], thisWeeksPlaylist }}
    >
      {children}
    </LeagueContext.Provider>
  )
}

export const useLeague = () => useContext(LeagueContext)
