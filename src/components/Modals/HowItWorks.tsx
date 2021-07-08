import React from "react"
import { useModal } from "hooks"
import { CalendarGraphic } from "components"

import './HowItWorks.scss'

const HowItWorks = ()  => {
  const { closeModal } = useModal()
  return (
    <div className="HowItWorks" onClick={closeModal}>
      <h2>How it Works</h2>
      <CalendarGraphic />
      <div>
        Every week the mix-league makes a new collaborative playlist and votes on their favorites
        together. Each contributor gets to rank their top three songs, but you can't pick songs
        you've heard before.
      </div>
    </div>
  )
}

export default HowItWorks
