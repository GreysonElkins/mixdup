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

export type { SpotifyTokens, UserTokenUpdate, UserContextType } from './contexts.d'
export { Day } from './contexts.d'