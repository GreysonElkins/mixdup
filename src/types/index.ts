import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type RouteType = {
  path: string
  exact?: boolean
  component: React.FC
  inNav?: {
    name: string
    icon: IconDefinition
    to?: string
  }
}

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
export type FixedLengthArray<T extends any[]> = Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>> & {
  [Symbol.iterator]: () => IterableIterator<ArrayItems<T>>
}

export type { SpotifyPlaylist, TrackItem } from './spotifyData.d'
export { Day } from './contexts.d'
export type {
  SpotifyTokens,
  UserTokenUpdate,
  UserContextType,
  LeagueContextType,
  CalendarContextType,
  DayAction,
} from './contexts.d'