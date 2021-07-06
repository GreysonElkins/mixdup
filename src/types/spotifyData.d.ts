export type SpotifyPlaylist = {
  external_urls: any
  description: string
  collaborative: boolean
  followers: { href: any; total: number }
  href: string
  id: string
  images: any[]
  name: string
  owner: {
    display_name: string
    externalUrls: any
    href: string
    id: string
    type: string
    uri: string
  }
  primary_color: any
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    items: Array<{
      added_at: string
      added_by: string
      is_local: false
      primary_color: any
      track: TrackItem
      video_thumbnail: any
    }>
    limit: 100
    next: any
    offset: number
    previous: any
    total: number
  }
  type: string
  uri: string
}

export type TrackItem = {
  album: Album
  artists: artist[]
  available_markets: Array<any>
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: any
  external_urls: any
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  track_number: number
  type: string
  uri: string
}

export type Artist = {
  external_urls: any
  href: string
  id: string
  name: string
  type: string
  uri: string
}

type Album = {
  album_type: string
  artists: artist[]
  available_markets: Array<any>
  external_urls: any
  href: string
  id: string
  images: Array<{
    height: number
    url: string
    width: number
  }>
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export type SearchResultsDefinition = {
  tracks: {
    href: string
    items: TrackItem[]
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
  }
}