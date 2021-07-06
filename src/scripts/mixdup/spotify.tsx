import { firebase } from 'scripts'
import { baseUrl } from '.'

export const search = async (query: string) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  return fetch(`${baseUrl}/search-spotify`, {
    method: 'POST',
    headers: {
      'Access-Control-Request-Headers': 'Content-Type, authorization',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  })
    .then((response) => {
      return response.text().then((text) => JSON.parse(text))
    })
    .catch((error) => console.error(error))
}
