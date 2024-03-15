import React, { useState } from 'react';
import { useAuth } from 'hooks/use-auth';
import { Navigate } from 'react-router-dom';
import HabitTracker from 'components/HabitTracker/HabitTracker';
import { WelcomeTitle } from './HabitTrackerPage.styled';

const HabitInput = ({ onCreate }) => {
  const [habitName, setHabitName] = useState('');

  const handleInputChange = (event) => {
    setHabitName(event.target.value);
  };

  const handleCreateClick = () => {
    onCreate(habitName);
    setHabitName('');
  };

  return (
    <div>
      <input type="text" value={habitName} onChange={handleInputChange} />
      <button onClick={handleCreateClick}>Create</button>
    </div>
  );
};


const HabitTrackerPage = () => {
  const { isAuth, email, displayName } = useAuth();
  const [newHabit, setNewHabit] = useState('');

const handleHabitCreate = (habitName) => {
    setNewHabit(habitName);
  };

  return isAuth ? (
    <div>
      <WelcomeTitle>Welcome {displayName || email}</WelcomeTitle>
      {newHabit ? (
        <h2>{newHabit}</h2>
      ) : (
        <HabitInput onCreate={handleHabitCreate} />
      )}
      <HabitTracker/>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HabitTrackerPage;
