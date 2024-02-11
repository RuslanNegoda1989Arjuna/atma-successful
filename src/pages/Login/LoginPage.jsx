import React from 'react'
import { DivBox } from './LoginPage.styled'
import LoginGoogle from 'components/LoginGoogle/LoginGoogle'

const LoginPage = () => {
  return (
    <DivBox>
      <h1>LoginPage</h1>
      <LoginGoogle/>
    </DivBox> )
}

export default LoginPage
