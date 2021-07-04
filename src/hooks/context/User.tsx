import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
  firebase,
//   getTokensFromFirebase,
//   saveTokensToFirebase,
  disconnectUser,
//   clearSpotifyTokensFromFirebase,
} from 'scripts'
// import { getTokensFromSpotify } from 'scripts'
import type { UserContextType, SpotifyTokens, UserTokenUpdate } from 'types'
import { toast } from 'react-toastify'

const UserContext = createContext({} as UserContextType)

export const UserProvider: React.FC = ({ children }) => {
  const [id, setId] = useState<string>('')
  const [incomingTokens, setIncomingTokens] = useState<boolean>(false)
  const [spotify_tokens, setSpotifyTokens] = useState<SpotifyTokens>({
    access_token: '',
    refresh_token: '',
  })
  const history = useHistory()

  firebase.auth().onAuthStateChanged((user) => {
    if (!id && user) {
      // blocks an infinite loop, but may require logout to be lifted to context
      setId(user.uid)
    //   !incomingTokens && getTokensFromFirebase(user.uid, updateUserTokens)
    }
  })

  const logout = () => {
    disconnectUser()
    setSpotifyTokens({ access_token: '', refresh_token: '' })
    setId('')
  }

  const updateUserTokens: UserTokenUpdate = useCallback((value, saveToFirebase) => {
    setSpotifyTokens(value)
    saveToFirebase && value !== { access_token: '', refresh_token: '' } && setIncomingTokens(true)
  }, [])

  const clearSpotifyTokens = async () => {
    try {
    //   await clearSpotifyTokensFromFirebase(id)
      setSpotifyTokens({ access_token: '', refresh_token: '' })
    } catch (error) {
      console.error(error)
      toast.dark('Something went wrong clearing you Spotify data. Try again!')
    }
  }

  useEffect(() => {
    setTimeout(() => {
    //   if (history.location.search) getTokensFromSpotify(history, updateUserTokens)
    }, 300)
  }, [history, setSpotifyTokens, updateUserTokens])

  useEffect(() => {
    // save tokens to firebase
    if (incomingTokens && id) {
    //   saveTokensToFirebase(id, spotify_tokens)
      setIncomingTokens(false)
    }
  }, [incomingTokens, id, spotify_tokens])

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: id !== '',
        id,
        spotify_tokens,
        updateUserTokens,
        logout,
        clearSpotifyTokens,
        incomingTokens, // not sure this actually got used
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
