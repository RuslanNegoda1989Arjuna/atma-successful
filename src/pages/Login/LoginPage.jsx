import React from 'react'
import { Link } from 'react-router-dom'
import Login from 'components/Login/Login'
import { DivBox } from './LoginPage.styled'

const LoginPage = () => {
  return (
    <DivBox>
      <h1>LoginPage</h1>
      <Login/>
          <p>
              Or <Link to="/register">register</Link>
          </p>
    </DivBox> )
}

export default LoginPage
