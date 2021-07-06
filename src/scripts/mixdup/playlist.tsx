import { firebase } from 'scripts'
import { baseUrl } from '.'

export const getAllPlaylists = async () => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken()
    if (!token) return console.error('You must log in to get all playlists')
    const playlistData = await fetch(`${baseUrl}/all-playlists`, { headers: {Authorization: `Bearer ${token}`}})
    const data = await playlistData.text()
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}
