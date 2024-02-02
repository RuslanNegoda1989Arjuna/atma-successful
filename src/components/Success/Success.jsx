import React from 'react'
import { Link } from 'react-router-dom';
import { DivBox } from './Success.styled';

const Success = () => {
  return (
    <DivBox>
      <h1>My New Successes</h1>
    <p>
              Or <Link to="/login">Login</Link>
          </p>
    </DivBox>
  )
}

export default Success
