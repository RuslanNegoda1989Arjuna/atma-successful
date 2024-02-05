import React from 'react';
import { useAuth } from 'hooks/use-auth';
import { Navigate } from 'react-router-dom';
// Star icon


const HomePage = () => {
  const { isAuth, email, displayName } = useAuth();

  return isAuth ? (
    <div>
      <h1>HomePage</h1>
      <h2>Welcome {displayName || email}</h2>
      <h3>Розпочнемо роботу над конисними навичками</h3>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;
