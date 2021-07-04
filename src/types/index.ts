export type RouteType = {
  path: string
  exact?: boolean
  component: React.FC
  inNav?: {
    name: string
    to?: string
  }
}
