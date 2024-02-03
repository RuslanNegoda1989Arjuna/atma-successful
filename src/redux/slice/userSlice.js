import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: null,
  displayName: null,
  email: null,
  token: null,
  photoURL: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { uid, displayName, email, token, photoURL } = action.payload;
      state.uid = uid;
      state.displayName = displayName;
      state.email = email;
      state.token = token;
      state.photoURL = photoURL;
    },
    removeUser(state) {
      state.uid = null;
      state.displayName = null;
      state.email = null;
      state.token = null;
      state.photoURL = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
