import { firebase } from 'scripts'
import { toast } from 'react-toastify'

export const getAllPlaylistsFromFirebase = async () => {
  try {
    const snapshot = await firebase.database().ref().child('playlists').get()
    return snapshot.exists() && snapshot.val()
  } catch (error) {
    console.error(error)
    toast.dark('Something went wrong getting all of the playlists', { toastId: 'Playlist fetch error' })
  }
}
