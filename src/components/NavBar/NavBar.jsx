import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <div>
         <h1>Navbar</h1>
      </div>
       <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </div>
  
  )
}

export default NavBar


