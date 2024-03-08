import React from 'react';
import { useAuth } from 'hooks/use-auth';
import { Navigate } from 'react-router-dom';
import HabitTracker from 'components/HabitTracker/HabitTracker';
import { WelcomeTitle } from './HabitTrackerPage.styled';

// Star icon


const HabitTrackerPage = () => {
  const { isAuth, email, displayName } = useAuth();

  return isAuth ? (
    <div>
      <WelcomeTitle>Welcome {displayName || email}</WelcomeTitle>
      <HabitTracker/>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HabitTrackerPage;
