import React from 'react'

import './PlaylistWrapper.scss'

const PlaylistWrapper = React.forwardRef<HTMLDivElement, { children: any, darkBackground?: boolean }>(({ children, darkBackground }, ref) => (
  <div className="PlaylistWrapper" ref={ref} style={{backgroundColor: darkBackground ? '#1B1A1A' : ''}}>
    {children}
  </div>
))

export default PlaylistWrapper