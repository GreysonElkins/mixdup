import React, {useEffect} from 'react'

import { getAllPlaylists } from 'scripts'

const PlaylistGallery: React.FC = () => {
  
  useEffect(() => {
    getAllPlaylists()
  }, [])

  return <></>
}

export default PlaylistGallery
