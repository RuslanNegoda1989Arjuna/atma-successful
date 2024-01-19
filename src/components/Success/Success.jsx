import React from 'react'
import { Link} from 'react-router-dom';

const Success = () => {
  return (
    <div>
      <h1>My New Successes</h1>
    <p>
              Or <Link to="/login">Login</Link>
          </p>
    </div>
  )
}

export default Success
