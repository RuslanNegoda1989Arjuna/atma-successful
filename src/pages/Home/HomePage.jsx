import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/slice/userSlice';
import EditProfile from '../../components/EditProfile/EditProfile'; // Додано імпорт EditProfile



const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuth, email, displayName } = useAuth();

  useEffect(() => {
    // Логіка, яка викликається при зміні імені користувача
    console.log('Display name changed:', displayName);
  }, [displayName]); // Передавання displayName як залежності

  return isAuth ? (
    <div>
      <h1>HomePage</h1>
      <h2>Welcome {displayName || email}</h2>
      <h3>Name:  {displayName}</h3>
      <button onClick={() => dispatch(removeUser())}>Log out from {displayName || email}</button>
      <Link to="/login">Go to login</Link>

      {/* Додано компонент EditProfile */}
      <EditProfile currentDisplayName={displayName} />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;
