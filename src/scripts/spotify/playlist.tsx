import { toast } from 'react-toastify'

export const followPlaylist = async (access_token: string, playlist_id: string) => {
  const bearer = `Bearer ${access_token}`
  try {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/followers`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
    })
    if (result.status === 200) {
      toast.success('Success!', { toastId: 'following playlist!' })
    }
    return result
  } catch (error) {
    console.error(error)
    return error
  }
}
