import React from 'react'
import './SpinningLoader.scss'

const loadIcon = (
  <img
    src="/headphones.svg"
    className={`spinning-loader`}
    alt="the app logo, a spinning pair of headphones"
  />
)

const SpinningLoader:React.FC<{solo?: boolean}> = ({ solo }) => {
  if (!solo) return <>{loadIcon}</>
  return (
    <div className="loading-wrapper">{loadIcon}</div>
  )
}

export default SpinningLoader