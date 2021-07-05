import { firebase, auth } from 'scripts'
import { toast } from 'react-toastify'

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
    .catch((error) => console.log(error))
}
