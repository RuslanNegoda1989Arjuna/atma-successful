import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/slice/userSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuth, email, displayName } = useAuth();

  return isAuth ? (
    <div>
      <h1>HomePage</h1>
      <h2>Welcome {displayName || email}</h2>
      <button onClick={() => dispatch(removeUser())}>Log out from {displayName || email}</button>
      <Link to="/login">Go to login</Link>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;
