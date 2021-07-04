import { firebase } from 'scripts'
import { SpotifyTokens, UserTokenUpdate } from 'types'

export const getTokensFromFirebase = (id: string, updateUserTokens: UserTokenUpdate) => {
  firebase
    .database()
    .ref()
    .child('users')
    .child(id)
    .child('spotify_tokens')
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        //   const data = snapshot.val()
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export const saveTokensToFirebase = (id: string, tokens: SpotifyTokens) => {
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
