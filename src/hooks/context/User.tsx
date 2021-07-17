import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import {
  firebase,
  disconnectUser,
  getSpotifyTokensFromFirebase,
  saveSpotifyTokensToFirebase,
  getTokensFromSpotify,
  clearSpotifyTokensFromFirebase,
} from 'scripts'

import type { UserContextType, SpotifyTokens } from 'types'

const UserContext = createContext({} as UserContextType)

export const UserProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [incomingTokens, setIncomingTokens] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [spotify_tokens, setSpotifyTokens] = useState<SpotifyTokens>({
    access_token: '',
    refresh_token: '',
  })
  const history = useHistory()

  const updateUserTokens = useCallback((value: SpotifyTokens, saveToFirebase?: boolean) => {
    setSpotifyTokens(value)
    saveToFirebase && value !== { access_token: '', refresh_token: '' } && setIncomingTokens(true)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (history.location.search) getTokensFromSpotify(history, updateUserTokens)
    }, 300)
  }, [history, setSpotifyTokens, updateUserTokens])

  useEffect(() => {
    if (incomingTokens && id) {
      saveSpotifyTokensToFirebase(id, spotify_tokens)
      setIncomingTokens(false)
    }
  }, [incomingTokens, id, spotify_tokens])

  firebase.auth().onAuthStateChanged(user => {
    setLoading(false)
    if (!id && user) {
      setId(user.uid)
      getSpotifyTokensFromFirebase(user.uid, updateUserTokens)
    }
  })

  const clearSpotifyTokens = async () => {
    try {
      await clearSpotifyTokensFromFirebase(id)
      setSpotifyTokens({ access_token: '', refresh_token: '' })
    } catch (error) {
      console.error(error)
      toast.dark('Something went wrong clearing your Spotify data. Try again!')
    }
  }

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
        updateUserTokens,
        clearSpotifyTokens
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
