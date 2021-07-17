import { toast } from 'react-toastify'
import * as H from 'history'

import { createVerifierAndChallenge, retrieveVerifierAndChallenge } from './crypto'
import { SpotifyTokens, UserTokenUpdate } from 'types'

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://mixdup-5p7577rqi-greysonelkins.vercel.app'

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

export const constructAuthURI = async (location: string) => {
  await createVerifierAndChallenge()
  const root = `https://accounts.spotify.com/authorize?`
  const params = {
    client_id: client_id,
    scope: [
      'user-follow-modify',
      'streaming',
      'user-read-email',
      'user-read-private',
      'playlist-modify-private',
      'playlist-modify-public',
    ].join(' '),
    response_type: 'code',
    redirect_uri: location,
    code_challenge_method: 'S256',
    code_challenge: retrieveVerifierAndChallenge().challenge,
  }
  return root + combineQueryParams(params)
}

export const askForSpotifyAuth = () => {
  constructAuthURI(baseUrl).then((uri) => {
    window.location.assign(uri)
  })
}

const getAuthCodeFromLocation = (location: H.Location) => {
  return location.search.substring(6)
}

type AccessResponse = {
  access_token?: string
  refresh_token?: string
  error?: string
}

export const requestAccessToken = (
  location: H.Location,
  redirect: string
): Promise<AccessResponse> => {
  const params = {
    client_id: client_id,
    grant_type: 'authorization_code',
    code: getAuthCodeFromLocation(location),
    code_verifier: retrieveVerifierAndChallenge().verifier,
    redirect_uri: redirect,
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
        response.text().then((text) => {
          return { error: text, access_token: '', refresh_token: '' }
        })
      }
    })
    .catch((error) => error)
}

export const getTokensFromSpotify = (history: H.History, updateUserTokens: UserTokenUpdate) => {
  const { location } = history
  if (location.search && location.search !== '?error=access_denied') {
    requestAccessToken(location, baseUrl)
      .then(({ refresh_token, access_token, error }) => {
        if (refresh_token && access_token) {
          updateUserTokens({ refresh_token, access_token }, true)
          history.push('/')
        } else {
          console.error(error)
          toast.dark("We couldn't authenticate Spotify", { toastId: 'bad spotify auth' })
          history.push('/')
        }
      })
      .catch((error) => {
        history.push('/')
        toast.dark(`Something went wrong authenticating with Spotify`, {
          toastId: 'something went wrong with spotify',
        })
        console.error(error)
      })
  } else if (location.search && location.search === '?error=access_denied') {
    history.push('/')
    console.error('The user refused to connect Spotify')
    toast.dark(
      `You won't be able to listen to music on this platform if you don't authenticate, but that's ok, you can still compete!`,
      {
        toastId: "User didn't authenticate",
      }
    )
  }
}
