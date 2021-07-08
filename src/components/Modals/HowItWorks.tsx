import React from "react"
import { useModal } from "hooks"
import { CalendarGraphic } from "components"

const HowItWorks = ()  => {
  const { closeModal } = useModal()
  return (
   <div>
     <h2>How it Works</h2>
     <CalendarGraphic />
     <div>
       Every week the mix-league makes a new playlist together and votes on their favorites
       together. Each contributor gets to rank their top three songs, but you can't pick songs
       you've heard before.
     </div>
     <button className="cta-1" onClick={closeModal}>
       Got it!
     </button>
   </div>
  )
}

export default HowItWorks
