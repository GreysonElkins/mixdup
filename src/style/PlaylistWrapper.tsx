import React from 'react'

import './PlaylistWrapper.scss'

const PlaylistWrapper = React.forwardRef<HTMLDivElement, { children: any }>(({ children }, ref) => (
  <div className="PlaylistWrapper" ref={ref}>
    {children}
  </div>
))

export default PlaylistWrapper