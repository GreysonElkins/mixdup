import React from 'react'
import { RouteType } from 'types'
import { useUser } from 'hooks'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserPage: React.FC = () => {
  const { logout } = useUser()
  return <button className="cta-3" onClick={logout}>Sign out</button>
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
