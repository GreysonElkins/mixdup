import React, { useState, useEffect } from "react"

import { useLeague, useCalendar } from "hooks"
import { dayFromDayNum, getThisWeeksTheme } from "scripts"

import './EmptySearchBin.scss'

const EmptySearchBin: React.FC = () => {
  const [theme, setTheme] = useState<string>('')
  const { today } = useCalendar()
  const { rules } = useLeague()

  useEffect(() => {
    getThisWeeksTheme(today)
      .then(theme => theme && setTheme(theme))
      .catch(error => console.error(error))
  }, [today])

  return (
    <div className="EmptySearchBin">
      <div className="empty-search-text">
        {theme && `This weeks theme is "${theme}"`}
        <br /> 
        <br /> 
        Send in a song before voting starts on {dayFromDayNum(rules[0].start)}
      </div>
      <img src="https://media.giphy.com/media/RtIMLBSGzkOZy/giphy.gif" alt="an animated cassette" />
    </div>
  )
}

export default EmptySearchBin
