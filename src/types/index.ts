import { ReactElement } from 'react'
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

export type RouteWithProps = {
  path: string
  render: (value: { location: any }) => ReactElement
}

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
export type FixedLengthArray<T extends any[]> = Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>> & {
  [Symbol.iterator]: () => IterableIterator<ArrayItems<T>>
}

export type {
  SpotifyPlaylist,
  TrackItem,
  SearchResultsDefinition,
  Artist,
  PartialSpotifyPlaylist,
  SpotifyTokens
} from './spotifyData.d'
export { Day } from './contexts.d'
export type {
  UserContextType,
  LeagueContextType,
  CalendarContextType,
  DayAction,
  ModalContextType,
  UserTokenUpdate,
} from './contexts.d'

export type { EffectProps } from 'hooks/useScrollPosition'
export type { VoteValues } from 'components/Votes'
export type {
  Vote,
  ChartLine,
  ChartedSongData,
  ChartConfig,
  ChartDataObject,
  Submission,
} from './statistics.d'