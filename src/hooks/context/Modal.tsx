import React, { useState, createContext, useContext, useEffect, ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalContextType } from 'types'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import './Modal.scss'

const ModalContext = createContext({} as ModalContextType)

export const ModalProvider: React.FC = ({ children }) => {
  const [isShowing, setIsShowing] = useState<boolean>(false)
  const [Content, setContent] = useState<ReactElement | null>(null)

  useEffect(() => {
    Content ? setIsShowing(true) : setIsShowing(false)
  }, [Content])
  
  const closeModal = () => setContent(null)

  const setModal = (content: ReactElement) => setContent(content)

  return (
    <ModalContext.Provider value={{ closeModal, setModal }}>
      {isShowing && Content && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-body" onClick={(event) => event.stopPropagation()}>
            <FontAwesomeIcon icon={faTimesCircle} className="close-icon" onClick={closeModal} />
            {Content}
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
