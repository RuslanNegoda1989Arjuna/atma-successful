import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  id: null,
  displayName: null, // Додано displayName
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) { 
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.displayName = action.payload.displayName; // Додано рядок
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.displayName = null; // Додано рядок
    },
    setDisplayName(state, action) {
      state.displayName = action.payload; // Додано функцію setDisplayName
    },
  },
});

export const { setUser, removeUser, setDisplayName } = userSlice.actions;
export default userSlice.reducer;
