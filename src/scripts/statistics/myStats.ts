import { getUserSubmissions } from 'scripts'
import { parseISO, isBefore, format, sub, getDay } from 'date-fns'
import { ChartLine, Vote, Submission } from 'types'

const initialDataset = [
  { label: 'score', data: [], backgroundColor: '#78A3AD', borderColor: '#78A3AD' },
  { label: 'heard before', data: [], backgroundColor: '#DD7373', borderColor: '#DD7373' },
  // https://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips
  // this might be the best way to add more information to tool-tips
]

export const parseSubmissionData = async (userId: string, votes: Vote[]) => {
  const submissions = await getUserSubmissions(userId)
  const parsedSubmissions = Object.values(submissions) as unknown as Submission[]
  const dateSetSubmissions = setDatesToStartOfWeek(parsedSubmissions)
  const dateSetVotes = setDatesToStartOfWeek(votes)
  const DateMap = createDataDateMap(dateSetSubmissions, dateSetVotes)
  const labels = Object.keys(DateMap)
  const datasets = labels.reduce((datasets: ChartLine[], date, i) => {
    // submissions are available on DateMap[date] as well, for song names,
    // but song names are on votes too, so question again why use submissions?
    DateMap[date].votes.forEach(({ score }) => {
      datasets[0].data.push(0)
      datasets[1].data.push(0)
      if (score === 0) datasets[1].data[i] += 1
      if (score !== 0) datasets[0].data[i] += score
    })
    return datasets
  }, initialDataset)
  return { labels, datasets }
}

type DatedItem = {
  created_at: string
  [key: string]: any
}

type DateSetItem = {
  created_at: Date
  [key: string]: any
}

const setDatesToStartOfWeek = (items: DatedItem[]) => {
  return items.map(({ created_at, ...props }) => {
    const day = parseISO(created_at)
    return {
      created_at: sub(day, { days: getDay(day) }),
      ...props,
    }
  })
}

type DateMap = {
  [index: string]: {
    votes: DateSetItem[]
    submissions: DateSetItem[]
  }
}

const createDataDateMap = (dateSetSubmissions: DateSetItem[], dateSetVotes: DateSetItem[]) => {
  return [...dateSetSubmissions, ...dateSetVotes]
    .sort((a, b) => {
      if (isBefore(a.created_at, b.created_at)) return -1
      if (isBefore(b.created_at, a.created_at)) return 1
      return 0
    })
    .reduce((dates: DateMap, { created_at, trackName }) => {
      const made = format(created_at, 'dd-MMM-yy')
      if (!dates[made])
        dates[made] = {
          votes: dateSetVotes.filter((vote) => vote.trackName === trackName),
          submissions: dateSetSubmissions.filter(
            (submission) => submission.created_at === created_at
          ),
        }
      return dates
    }, {})
}
