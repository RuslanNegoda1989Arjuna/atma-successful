import SingUp from 'components/SingUp/SingUp'
import React from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div>
      <h1>RegisterPage</h1>
      <SingUp/>
          <p>
              Already have account?  <Link to="/login">Sign in</Link>
          </p>
    </div>
  )
}

export default RegisterPage
