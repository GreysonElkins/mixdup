import { sub, getDay, parseISO, isAfter, isBefore } from 'date-fns'
import { getSubmissionFromVote, getUserName } from 'scripts'
import { Vote, ChartDataObject, Submission } from 'types'

export const getLastWeeksVotes = (votes: Vote[], today: Date) => {
  const lastSunday = sub(today, { days: getDay(today) })
  const lastTuesday = sub(today, { days: getDay(today) + 5 })
  return votes.filter(({ created_at }: Vote) => {
    const made = parseISO(created_at)
    return isAfter(made, lastTuesday) && isBefore(made, lastSunday)
  })
}

type RawSubmissionData = {
  [key: string]: Submission
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findSubmittersName = async (trackName: string) => {
  // this function will be a challenge to use in `chartLastWeeksVotes` reduce
  const submission = await getSubmissionFromVote(trackName) as unknown as RawSubmissionData
  if (!submission) return 'MixDup'
  const { userId } = Object.values(submission)[0]
  const username = await getUserName(userId)
  return username
}

export const chartLastWeeksVotes = (votes: Vote[]) => {
  const initialDataSet = {
    labels: [],
    datasets: [
      { label: 'score', data: [], backgroundColor: '#78A3AD' },
      { label: 'heard before', data: [], backgroundColor: '#DD7373' },
    ],
  }
  return votes.reduce(({ labels, datasets }: ChartDataObject, { trackName, score }: Vote) => {
    const printableTrackName = trackName
      ? trackName.length > 13
        ? `${trackName.slice(0, 13)}...`
        : trackName
      : trackName 

    if (!labels.includes(printableTrackName)) {
      labels.push(printableTrackName)
      datasets.forEach(({ data }) => data.push(0))
    }
    const dataIndex = labels.indexOf(printableTrackName)
    if (score === 0) {
      datasets[1].data[dataIndex] += 1
    } else {
      datasets[0].data[dataIndex] += score
    }
    return { labels, datasets }
  }, initialDataSet)
}
