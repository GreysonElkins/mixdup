import React from 'react'
import { Redirect } from 'react-router-dom'

import { RouteType } from 'types'
import { useUser } from 'hooks'
import { LoginSignUpForm } from 'components'
import './Login.scss'

export const LoginPage: React.FC = () => {
  const { isLoggedIn } = useUser()

  if (isLoggedIn) return <Redirect to='/' />
  
  return (
  <main className="Login">
    <img 
      src='/headphones.svg' 
      className="App-logo" 
      alt="the app logo, a spinning pair of headphones"
    />
    <LoginSignUpForm />
  </main>
)}

const login: RouteType = {
  path: '/login',
  component: LoginPage,
  exact: true,
}

export default login
