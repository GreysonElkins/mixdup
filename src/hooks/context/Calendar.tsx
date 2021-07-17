import { createContext, useState, useContext, useEffect } from 'react'
import { CalendarContextType } from 'types'

import { AdminCalendarControl } from 'components'

const CalendarContext = createContext({} as CalendarContextType)

export const CalendarProvider: React.FC = ({ children }) => {
  const [dateOverride, setDateOverride] = useState<Date | null>(null)
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false)
  const today = new Date()

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') setIsAdminMode(true)
  }, [])

  return (
    <CalendarContext.Provider value={{ today: dateOverride || today, isAdminMode, setIsAdminMode }}>
      {children}
      {isAdminMode && (
        <AdminCalendarControl
          isDateOverride={dateOverride !== null}
          setDateOverride={setDateOverride}
        />
      )}
    </CalendarContext.Provider>
  )
}

export const useCalendar = () => useContext(CalendarContext)
