import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { buttonsObj } from '../../constants';

const initialState = {
  buttonsData: buttonsObj,
  status: 'idle',
  error: null
};

export const fetchDataFromDatabase = createAsyncThunk(
  'habitTracker/fetchDataFromDatabase',
  async () => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data().buttonsData;
      } else {
        await setDoc(userDocRef, { buttonsData: buttonsObj });
        return buttonsObj;
      }
    } catch (error) {
      throw error;
    }
  }
);

const habitTrackerSlice = createSlice({
  name: 'habitTracker',
  initialState,
  reducers: {
    setButtonsData(state, action) {
      state.buttonsData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromDatabase.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataFromDatabase.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buttonsData = action.payload || initialState.buttonsData;
      })
      .addCase(fetchDataFromDatabase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setButtonsData } = habitTrackerSlice.actions;

export default habitTrackerSlice.reducer;
