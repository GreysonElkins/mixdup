import { firebase, auth } from 'scripts'
import { toast } from 'react-toastify'

import { UserTokenUpdate, SpotifyTokens } from 'types'

type AuthenticatingUser = { email: string; password: string; username: string; isSignUp: boolean }

const signInErrors = (error: any) => {
  switch (error?.code) {
    // auth/invalid-email
    case 'auth/email-already-in-use':
      toast.dark('That email is already in use', { toastId: 'existing email' })
      break
    case 'auth/wrong-password':
      toast.dark('Incorrect password', { toastId: 'bad password' })
      break
    case 'auth/user-not-found':
      toast.dark("That user wasn't found", { toastId: 'no user' })
      break
    default:
      toast.dark(error?.message)
  }
  console.error(error)
}

export const signIn = async ({ email, password, username, isSignUp }: AuthenticatingUser) => {
  try {
    if (isSignUp) {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      user && firebase.database().ref('users/' + user.uid).set({ username })
    } else {
      await auth.signInWithEmailAndPassword(email, password)
    }
    return true
  } catch (error) {
    signInErrors(error)
  }
}

export const disconnectUser = () => {
  firebase
    .auth()
    .signOut()
    .catch((error) => console.error(error))
}

export const getUserName = async (userId: string) => {
  const snapshot = await firebase
    .database()
    .ref()
    .child('users')
    .child(userId)
    .child('username')
    .get()
  return snapshot.exists() && snapshot.val()
}

export const getUserSubmissions = async (id: string) => {
  try {
    const snapshot = await firebase
      .database()
      .ref('submission')
      .orderByChild('userId')
      .equalTo(id)
      .get()
    return snapshot.exists() && snapshot.val()
  } catch (error) {
    console.error(error)
  }
}

export const saveSpotifyTokensToFirebase = (id: string, tokens: SpotifyTokens) => {
  firebase
    .database()
    .ref('users/' + id + '/spotify_tokens')
    .set({ ...tokens })
}

export const clearSpotifyTokensFromFirebase = async (userId: string) => {
  return await firebase
    .database()
    .ref('users/' + userId + '/spotify_tokens')
    .set({ access_token: '', refresh_token: '' })
}

export const getSpotifyTokensFromFirebase = (id: string, updateUserTokens: UserTokenUpdate) => {
  firebase
    .database()
    .ref()
    .child('users')
    .child(id)
    .child('spotify_tokens')
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        if (data.access_token && data.refresh_token) updateUserTokens(data)
      } else {
        console.log('No saved tokens')
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
