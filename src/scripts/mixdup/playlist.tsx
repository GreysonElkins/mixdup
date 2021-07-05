import { firebase } from 'scripts'
import { baseUrl } from '.'

export const getAllPlaylists = async () => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken()
    if (!token) return console.error('You must log in to get all playlists')
    const playlistData = await fetch(`${baseUrl}/all-playlists`)
    playlistData.text().then(text => console.log(text))
  } catch (error) {
    console.error(error)
  }
}
