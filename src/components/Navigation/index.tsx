import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { allRoutes } from 'views'
import './Navigation.scss'

const Navigation: React.FC = () => {
  const icons = allRoutes.filter(({ inNav }) => inNav).map(({ inNav, path }) => (
    <NavLink to={inNav?.to || path} activeClassName="currentPage" key={`nav-button-${path}`}>
      <FontAwesomeIcon icon={inNav!.icon} size='2x' />
      {inNav!.name}
    </NavLink>
  ))
  return <nav className="Navigation">{icons}</nav>
}

export default Navigation