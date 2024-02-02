import React from 'react'
// import { Link } from 'react-router-dom'
// import Login from 'components/Login/Login'
import { DivBox } from './LoginPage.styled'
import LoginGoogle from 'components/LoginGoogle/LoginGoogle'

const LoginPage = () => {
  return (
    <DivBox>
      <h1>LoginPage</h1>
      <LoginGoogle/>
      {/* <Login/> */}
    </DivBox> )
}

export default LoginPage
