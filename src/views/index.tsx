import { Route } from 'react-router-dom'
import { RouteType } from 'types'

import landingPage from './LandingPage'

export const allRoutes: RouteType[] = [landingPage]

export default allRoutes.map(({ path, component, exact }, i) => (
  <Route key={`path-${i}`} component={component} exact={exact} path={path} />
))