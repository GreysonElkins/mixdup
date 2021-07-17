import { toast } from 'react-toastify'
import { SpotifyTokens, UserTokenUpdate } from 'types'

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID

type Params = { [key: string]: any }
interface TokenResponse extends SpotifyTokens {
  error: any
}

export const combineQueryParams = (params: Params) => {
  const parameters = Object.keys(params)
  const query = parameters.map((parameter) => `${parameter}=${params[parameter]}`).join(`&`)
  return query
}

const askForRefreshedTokens = async (old_refresh_token: string) => {
  const params = {
    grant_type: 'refresh_token',
    refresh_token: old_refresh_token,
    client_id: client_id,
  }

  return fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: combineQueryParams(params),
  })
    .then((response) => {
      if (response.ok) {
        return response
          .text()
          .then((text) => JSON.parse(text))
          .then((tokens) => {
            return { ...tokens, error: '' }
          })
      } else {
        return response
          .text()
          .then((text) => ({ error: text, refresh_token: '', access_token: '' }))
      }
    })
    .catch((error) => console.log('refresh error:', error))
}

export const getRefreshedAuth = (tokens: SpotifyTokens, updateUserTokens: UserTokenUpdate) => {
  const { refresh_token } = tokens

  return askForRefreshedTokens(refresh_token)
    .then(({ refresh_token, access_token, error }: TokenResponse) => {
      if (!error) {
        updateUserTokens({ access_token, refresh_token }, true)
        return access_token
      } else {
        const errorObject = JSON.parse(error)
        if (errorObject.error_description === 'Refresh token revoked') {
          toast.dark('You need to re-authenticate Spotify to use the player')
        }
        console.error('refresh error:', errorObject)
        return ''
      }
    })
    .catch((error) => {
      toast.dark("We couldn't refresh your spotify connection")
      console.error(error)
      return ''
    })
}


