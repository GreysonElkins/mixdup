import { createContext, useState, useContext } from 'react'
import { CalendarContextType } from 'types'

import { AdminCalendarControl } from 'components'

const CalendarContext = createContext({} as CalendarContextType)

export const CalendarProvider: React.FC = ({ children }) => {
  const [dateOverride, setDateOverride] = useState<Date | null>(null)
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false)
  const today = new Date()

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
