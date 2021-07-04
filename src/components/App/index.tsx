import React from 'react'
import { Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import RouteMap from 'views'
import { useUser } from 'hooks'
import { LoginPage } from 'views/Login'

import './App.scss'

const App: React.FC = () => {
  const { isLoggedIn } = useUser()
  
  if (!isLoggedIn) return <LoginPage />

  return (
    <>
      <Switch>{RouteMap}</Switch>
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default App;
