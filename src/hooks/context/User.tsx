import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { firebase, disconnectUser } from 'scripts'
import type { UserContextType } from 'types'

const UserContext = createContext({} as UserContextType)

export const UserProvider: React.FC = ({ children }) => {
  const [id, setId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const history = useHistory()

  firebase.auth().onAuthStateChanged((user) => {
    setLoading(false)
    if (!id && user) setId(user.uid)
  })

  const logout = () => {
    disconnectUser()
    setId('')
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        id,
        isLoggedIn: id !== '',
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
