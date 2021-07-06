import { createContext, useContext, useEffect, useState } from 'react'
import { getDate, getDay } from 'date-fns'
import { ruleOfTheDay } from 'scripts'
import { DayAction, Day, LeagueContextType } from 'types'
import { useCalendar } from 'hooks'

const LeagueContext = createContext({} as LeagueContextType)

export const LeagueProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<'vote' | 'submit' | 'loading'>('loading')
  const [votingStarts] = useState<DayAction>({ start: Day.WED, action: 'vote' })
  const [submissionsStart] = useState<DayAction>({ start: Day.SUN, action: 'submit' })
  const { today } = useCalendar()

  useEffect(() => {
    const rule = ruleOfTheDay({
      day: getDate(today),
      actions: [votingStarts, submissionsStart],
    })
    setMode(rule)
  }, [submissionsStart, today, votingStarts])

  return (
    <LeagueContext.Provider
      value={{ mode, loading: mode === 'loading', rules: [votingStarts, submissionsStart] }}
    >
      {children}
    </LeagueContext.Provider>
  )
}

export const useLeague = () => useContext(LeagueContext)
