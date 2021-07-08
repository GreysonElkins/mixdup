import { firebase } from 'scripts'
import { baseUrl } from '.'
import { toast } from 'react-toastify'
import { SpotifyPlaylist } from 'types'

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

export const getThisWeeksTheme = async (date: Date) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken()
    const result = await fetch(`${baseUrl}/new-theme-new-list`, {
      method: 'POST',
      headers: {
        'Access-Control-Request-Headers': 'Content-Type, authorization',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date }),
    })
    return await result.text()
  } catch (error) {
    console.log(error)
  }
}

export const getRelevantPlaylist = async (date: Date): Promise<SpotifyPlaylist | undefined> => {
  try {
    const data = await fetch(`${baseUrl}/contest-playlist`, {
      method: 'POST',
      headers: {
        'Access-Control-Request-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date }),
    })
    return data
      .text()
      .then(playlist => {
        return JSON.parse(playlist)
      })
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error)
  }
}

export const submitSong = async (user_id: string, submission_uri: string, trackName: string, date: Date) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken()
    await fetch(`${baseUrl}/submit-song`, {
      method: 'POST',
      headers: {
        'Access-Control-Request-Headers': 'Content-Type, authorization',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id, submission_uri, trackName, date }),
    }).then((response) => {
      if (response.ok) {
        toast.success('Your submission for the next playlist has been received!', {
          toastId: 'playlist submission',
        })
      } else {
        console.error(response)
        if (response.status === 429)
          return toast.dark('You already submitted a song for this weeks playlist!')
        toast.dark('Something went wrong, try that again.', {
          toastId: 'playlist submission error',
        })
      }
    })
  } catch (error) {
    console.error(error)
    toast.dark('Something went wrong, try that again.', { toastId: 'submission api error' })
  }
}