import React from 'react'
import { RouteType } from 'types'
import { useUser, useCalendar } from 'hooks'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './User.scss'

const allowedAdmins = ['veRac5MSniez7aBV3gZUMTB5yu32']

const UserPage: React.FC = () => {
  const { id, logout, access_token, clearSpotifyTokens } = useUser()
  const { isAdminMode, setIsAdminMode } = useCalendar()

  return (
    <div className="user-controls">
      {allowedAdmins.includes(id) && (
        <label htmlFor="admin-mode" onClick={() => setIsAdminMode(!isAdminMode)}>
          Admin Mode
          <input type="checkbox" checked={isAdminMode} name="admin-mode" readOnly/>
        </label>
      )}
      {access_token && (
        <button className="cta-3" onClick={clearSpotifyTokens}>
          Disconnect from Spotify
        </button>
      )}
      <button className="cta-3" onClick={logout}>
        Sign out
      </button>
    </div>
  )
}

const userPage: RouteType = {
  path: '/settings',
  component: UserPage,
  exact: true,
  inNav: {
    name: 'account',
    icon: faUser,
  },
}

export default userPage
