import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
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
      const dayDocRef = doc(db, 'days', 'new');
      const daySnap = await getDoc(dayDocRef);
      if (daySnap.exists()) {
        return daySnap.data().buttonsData;
      } else {
        await setDoc(dayDocRef, { buttonsData: buttonsObj });
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
