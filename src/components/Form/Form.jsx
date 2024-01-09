import { useState } from "react";

import React from 'react'

const Form = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


  return (
    <div>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

          />
          <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}/>
    </div>
  )
}

export default Form
