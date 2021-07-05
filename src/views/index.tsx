import { Route } from 'react-router-dom'
import { RouteType } from 'types'

import landingPage from './LandingPage'
import login from './Login'
import league from './League'
import user from './User'

export const allRoutes: RouteType[] = [landingPage, league, user, login]

export default allRoutes.map(({ path, component, exact }, i) => (
  <Route key={`path-${i}`} component={component} exact={exact} path={path} />
))