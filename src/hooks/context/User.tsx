import { createContext, useContext, useState, useCallback } from 'react'
import {
  firebase,
  disconnectUser,
  getSpotifyTokensFromFirebase,
  saveSpotifyTokensToFirebase,
} from 'scripts'

import type { UserContextType, SpotifyTokens } from 'types'

const UserContext = createContext({} as UserContextType)

export const UserProvider: React.FC = ({ children }) => {
  const [id, setId] = useState<string>('')
  const [spotify_tokens, setSpotifyTokens] = useState<SpotifyTokens>({
    access_token: '',
    refresh_token: '',
  })
  const [loading, setLoading] = useState<boolean>(true)

  const updateUserTokens = useCallback(
    (value: SpotifyTokens, saveToFirebase?: boolean) => {
      setSpotifyTokens(value)
      if (saveToFirebase && value !== { access_token: '', refresh_token: '' })
        saveSpotifyTokensToFirebase(id, value)
    },
    [id]
  )

  firebase.auth().onAuthStateChanged((user) => {
    setLoading(false)
    if (!id && user) {
      setId(user.uid)
      getSpotifyTokensFromFirebase(user.uid, updateUserTokens)
    }
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
        access_token: spotify_tokens.access_token,
        refresh_token: spotify_tokens.refresh_token,
        updateUserTokens
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
