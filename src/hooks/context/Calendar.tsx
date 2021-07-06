import { createContext, useContext } from 'react'
import { CalendarContextType } from 'types'

const CalendarContext = createContext({} as CalendarContextType)

export const CalendarProvider: React.FC = ({ children }) => {
  const today = new Date()

  return <CalendarContext.Provider value={{ today }}>{children}</CalendarContext.Provider>
}

export const useCalendar = () => useContext(CalendarContext)
