import { Route } from 'react-router-dom'
import { RouteType, RouteWithProps } from 'types'

import homePage from './Home'
import login from './Login'
import league from './League'
import user from './User'
import playlistPage from './Playlist'

export const routes: RouteType[] = [league, homePage, user, login]
const routesWithProps: RouteWithProps[] = [playlistPage]

const Routes = routes.map(({ path, component, exact }, i) => (
  <Route key={`path-${i}`} component={component} exact={exact} path={path} />
))

const PropRoutes = routesWithProps.map(({ render, path }, i) => (
  <Route key={`route-path-${i}`} path={path} render={render} />
))

const CombinedRoutes = [...Routes, ...PropRoutes]

export default CombinedRoutes