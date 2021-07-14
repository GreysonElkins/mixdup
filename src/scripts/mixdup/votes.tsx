import { firebase } from 'scripts'
import { baseUrl } from '.'
import { toast } from 'react-toastify'

import { VoteValues } from 'types'

export const submitVotes = async (user_id:string, votes: VoteValues, date: Date) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken()
    await fetch(`${baseUrl}/submit-votes`, {
      method: 'POST',
      headers: {
        'Access-Control-Request-Headers': 'Content-Type, authorization',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id, votes, date }),
    }).then((response) => {
      if (response.ok) {
        toast.success('You voted! Tell everybody!', {
          toastId: 'vote submission',
        })
      } else {
        console.error(response)
        if (response.status === 429)
          return toast.dark('You already voted this week. This is a democracy, quit.')
        toast.dark('Something went wrong, try that again.', {
          toastId: 'playlist submission error',
        })
      }
    })
  } catch (error) {
    toast.dark('Something went wrong, try that again.', { toastId: 'vote api error' })
  }
}
