import { Day } from 'types'

type Action = { start: Day | number, action: 'vote' | 'submit' }
export const voting:Action = { start: Day.MON, action: 'vote' }
export const submission:Action = { start: Day.THU, action: 'submit' }

export const ruleOfTheDay = (day: Day | number): 'vote' | 'submit' => {
  const events = [voting, submission].sort((a, b) => a.start - b.start)
  if (day < events[0].start) return events[1].action
  if (events[0].start <= day && day < events[1].start) return events[0].action
  if (day >= events[1].start) return events[1].action
  console.error('ruleOfTheDay encountered an unexpected value')
  return 'vote'
}

export { default as firebase, auth } from './firebase/firebaseConfig'
export { signIn, disconnectUser } from './firebase/user'
export { getAllPlaylists } from './mixdup/playlist'
