import { Day, DayAction, FixedLengthArray } from 'types'

type Props = { day: Day | number, actions?: FixedLengthArray<[DayAction, DayAction]> }

export const defaultVoting:DayAction = { start: Day.MON, action: 'vote' }
export const defaultSubmission:DayAction = { start: Day.THU, action: 'submit' }


export const ruleOfTheDay = ({
  day, actions = [defaultVoting, defaultSubmission]
}: Props): 'vote' | 'submit' => {
  const events = actions.sort((a, b) => a.start - b.start)
  if (day < events[0].start) return events[1].action
  if (events[0].start <= day && day < events[1].start) return events[0].action
  if (day >= events[1].start) return events[1].action
  console.error('ruleOfTheDay encountered an unexpected value')
  return 'vote'
}

export { default as firebase, auth } from './firebase/firebaseConfig'
export { signIn, disconnectUser } from './firebase/user'
export { getAllPlaylists } from './mixdup/playlist'
export { search } from './mixdup/spotify'
