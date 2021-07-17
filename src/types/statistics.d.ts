export type Vote = {
  created_at: string
  score: number
  trackName: string
  updated_at: string
  userId: string
}

export type Submission = {
  created_at: string
  spotify_playlist_id: string
  submission_uri: string
  trackName: string
  userId: string
}

export type ChartLine = {
  label: string
  data: number[]
  backgroundColor?: string
}

export type ChartedSongData = {
  data: ChartDataObject
}

export type ChartDataObject = {
  labels: string[]
  datasets: ChartLine[]
}

export type ChartConfig = {
  data: {
    datasets: ChartLine[]
  }
}
