import React from 'react'
import { Switch } from 'react-router-dom'

import RouteMap from 'views'
import { useUser, useCalendar } from 'hooks'
import { LoginPage } from 'views/Login'
import { Navigation } from 'components'
import { SpinningLoader } from 'style'

import './App.scss'

const App: React.FC = () => {
  const { isLoggedIn, loading } = useUser()
  const { isAdminMode } = useCalendar()
  
  if (loading) return <SpinningLoader solo />
  if (!isLoggedIn) return <LoginPage />

  return (
    <div className="App">
      <main style={{ height: isAdminMode ? 'calc(100vh - 192px)' : '100vh'}}>
        <Switch>{RouteMap}</Switch>
      </main>
      <Navigation />
    </div>
  )
}

export default App;
