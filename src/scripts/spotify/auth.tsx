import { SpotifyTokens } from 'types'

// export const getRefreshedAuth = (tokens: SpotifyTokens, updateUserTokens: UserTokenUpdate) => {
//   const { refresh_token } = tokens

//   return askForRefreshedTokens(refresh_token)
//     .then(({ refresh_token, access_token, error }: TokenResponse) => {
//       if (!error) {
//         updateUserTokens({ access_token, refresh_token }, true)
//         return access_token
//       } else {
//         const errorObject = JSON.parse(error)
//         if (errorObject.error_description === 'Refresh token revoked') {
//           toast.dark('You need to re-authenticate Spotify to use the player')
//         }
//         console.error('refresh error:', errorObject)
//         return ''
//       }
//     })
//     .catch((error) => {
//       toast.dark("We couldn't refresh your spotify connection")
//       console.error(error)
//       return ''
//     })
// }


