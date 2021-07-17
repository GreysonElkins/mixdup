import { firebase } from 'scripts'

export const getVotesFromFirebase = async () => {
  const snapshot = await firebase.database().ref().child('vote').get()
  return snapshot.exists() && snapshot.val()
}

export const getSubmissionFromVote = async (trackName: string) => {
  const snapshot = await firebase
    .database()
    .ref('submission')
    .orderByChild('trackName')
    .equalTo(trackName)
    .get()
  return snapshot.exists() && snapshot.val()
}
