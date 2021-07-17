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

export const dayFromDayNum = (num: Day) => {
  switch (num) {
    case 0:
      return 'Sunday'
    case 1:
      return 'Monday'
    case 2: 
      return 'Tuesday'
    case 3: 
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday' 
  }
}

export { default as firebase, auth } from './firebase/firebaseConfig'
export {
  signIn,
  disconnectUser,
  getUserName,
  getUserSubmissions,
  getSpotifyTokensFromFirebase,
  saveSpotifyTokensToFirebase,
  clearSpotifyTokensFromFirebase,
} from './firebase/user'
export { search } from './mixdup/spotify'
export {
  getPlaylist,
  getAllPlaylists,
  submitSong,
  getRelevantPlaylist,
  getThisWeeksTheme,
} from './mixdup/playlist'
export { submitVotes } from './mixdup/votes'
export { getVotesFromFirebase, getSubmissionFromVote } from './firebase/vote'
export { lastWeeksChartData } from './statistics/lastWeeksVotes'
export { parseSubmissionData } from './statistics/myStats'
export { getRefreshedAuth, askForSpotifyAuth, getTokensFromSpotify } from './spotify/auth'
export { followPlaylist } from './spotify/playlist'