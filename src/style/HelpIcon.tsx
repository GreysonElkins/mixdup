import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { useModal } from 'hooks'
import './HelpIcon.scss'

const HelpIcon:React.FC<{modal: React.FC<any>}> = ({ modal }) => {
  const { setModal } = useModal()
  
  return (
    <div className="HelpIcon" onClick={() => setModal(modal)}>
      <FontAwesomeIcon icon={faQuestionCircle} />
    </div>
  )
}

export default HelpIcon