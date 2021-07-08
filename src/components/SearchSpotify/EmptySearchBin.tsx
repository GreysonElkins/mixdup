import React from "react"

import { useLeague } from "hooks"
import { dayFromDayNum } from "scripts"

import './EmptySearchBin.scss'

const EmptySearchBin: React.FC = () => {
  const { rules } = useLeague()
  return (
    <div className="EmptySearchBin">
      <img src="https://media.giphy.com/media/RtIMLBSGzkOZy/giphy.gif" alt="an animated cassette" />
      <div className="empty-search-text">
        Submissions have started for this weeks playlist
        <br /> 
        <br /> 
        Send in a song before voting starts on {dayFromDayNum(rules[1].start)}
      </div>
    </div>
  )
}

export default EmptySearchBin
