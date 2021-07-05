export type SpotifyTokens = {
  access_token: string
  refresh_token: string
}

export type UserTokenUpdate = (value: SpotifyTokens, saveToFirebase?: boolean) => void

export interface UserContextType {
  loading: boolean
  id: string
  isLoggedIn: boolean
  logout: () => void
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