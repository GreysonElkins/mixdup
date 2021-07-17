import { toast } from 'react-toastify'
import { getRefreshedAuth as refreshedAuth, followPlaylist as follow, askForSpotifyAuth } from 'scripts'
import { useUser } from 'hooks'

export const getRefreshedAuth = refreshedAuth

const useSpotify = () => {
  const { access_token, refresh_token, updateUserTokens } = useUser()

  const checkAuthentication = () => {
    if (!access_token && !refresh_token) askForSpotifyAuth()
  }

  const checkAction = async (
    result: any,
    action: (token: string, val?: any) => void,
    param?: any
  ) => {
    if (result.status >= 200 && result.status < 300) return result
    if (result.status === 401) {
      const new_token = await getRefreshedAuth({ access_token, refresh_token }, updateUserTokens)
      new_token
        ? action(new_token, param)
        : toast.dark('Something went wrong', { toastId: 'error after auth refresh' })
    }
  }

  const followPlaylist = async (playlist_id: string) => {
    checkAuthentication()
    try {
      const result = await follow(access_token, playlist_id)
      return checkAction(result, follow, playlist_id)
    } catch (error) {
      console.error(error)
    }
  }

  return { followPlaylist }
}

export default useSpotify
