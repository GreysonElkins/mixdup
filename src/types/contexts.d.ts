import { FixedLengthArray } from "types"

export type UserTokenUpdate = (value: SpotifyTokens, saveToFirebase?: boolean) => void

export type UserContextType = {
  loading: boolean
  isLoggedIn: boolean
  id: string
  username: string
  logout: () => void
  access_token: string
  refresh_token: string
  updateUserTokens: UserTokenUpdate
  clearSpotifyTokens: () => void
}

export type LeagueContextType = {
  loading: boolean
  mode: 'vote' | 'submit' | 'loading'
  rules: FixedLengthArray<[DayAction, DayAction]>
  thisWeeksPlaylist: SpotifyPlaylist | undefined
}
export type CalendarContextType = {
  today: Date
  isAdminMode: boolean
  setIsAdminMode: (mode: boolean) => void
}

export type ModalContextType = { closeModal: () => void, setModal: (content: ReactElement) => void }

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