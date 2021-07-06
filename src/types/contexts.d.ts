import { FixedLengthArray } from "types"

export type SpotifyTokens = {
  access_token: string
  refresh_token: string
}

export type UserTokenUpdate = (value: SpotifyTokens, saveToFirebase?: boolean) => void

export type UserContextType = {
  loading: boolean
  id: string
  isLoggedIn: boolean
  logout: () => void
}

export type LeagueContextType = {
  loading: boolean
  mode: 'vote' | 'submit' | 'loading'
  rules: FixedLengthArray<[DayAction, DayAction]>
}
export type CalendarContextType = {
  today: Date
}

export enum Day {
  SUN = 0,
  MON = 1,
  TUE = 2,
  WED = 3,
  THU = 4,
  FRI = 5,
  SAT = 6,
}

export type DayAction = { start: Day | number; action: 'vote' | 'submit' }