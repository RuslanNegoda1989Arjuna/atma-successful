import React, { useState } from 'react';
import { updateProfile, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setDisplayName } from '../../redux/slice/userSlice';

const EditProfile = ({ currentDisplayName }) => {
  const [newDisplayName, setNewDisplayName] = useState(currentDisplayName || '');
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleSave = async () => {
    try {
      // Оновити ім'я користувача в Firebase
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });

      // Оновити ім'я користувача в Redux store
      dispatch(setDisplayName(newDisplayName));
    } catch (error) {
      console.error('Failed to update display name:', error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newDisplayName}
        onChange={(e) => setNewDisplayName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditProfile;
