export type SpotifyTokens = {
  access_token: string
  refresh_token: string
}

export type UserTokenUpdate = (value: SpotifyTokens, saveToFirebase?: boolean) => void

export interface UserContextType {
  id: string
  isLoggedIn: boolean
  spotify_tokens: SpotifyTokens
  updateUserTokens: UserTokenUpdate
  logout: () => void
  incomingTokens: boolean
  clearSpotifyTokens: () => void
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