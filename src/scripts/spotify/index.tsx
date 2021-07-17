import { toast } from 'react-toastify'
import { SpotifyTokens } from 'types'

// const useSpotify = async (
//   tokens: SpotifyTokens,
//   updateUserTokens: (value: SpotifyTokens, saveToFirebase?: boolean) => void,
//   spotifyAction: (token: string, query?: any) => any,
//   query?: any
// ) => {
//   const { access_token } = tokens
//   try {
//     const result = await spotifyAction(access_token, query)
//     if (result.status === 200) return result
//     if (result.status === 401) {
//       const new_token = await getRefreshedAuth(tokens, updateUserTokens)
//       new_token
//         ? spotifyAction(new_token, query)
//         : toast.dark('Something went wrong', { toastId: 'error after auth refresh' })
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

// export default useSpotify