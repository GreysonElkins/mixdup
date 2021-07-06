import React from 'react'
import { Switch } from 'react-router-dom'


import RouteMap from 'views'
import { useUser } from 'hooks'
import { LoginPage } from 'views/Login'
import { Navigation } from 'components'
import { SpinningLoader } from 'style'

import './App.scss'

const App: React.FC = () => {
  const { isLoggedIn, loading } = useUser()

  if (loading) return <SpinningLoader solo />
  if (!isLoggedIn) return <LoginPage />

  return (
    <>
      <main>
        <Switch>{RouteMap}</Switch>
      </main>
      <Navigation />
    </>
  )
}

export default App;
