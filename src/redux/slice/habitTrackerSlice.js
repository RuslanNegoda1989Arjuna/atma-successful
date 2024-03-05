import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  buttonsData: [],
  status: 'idle',
  error: null
};

export const fetchDataFromDatabase = createAsyncThunk(
  'habitTracker/fetchDataFromDatabase',
  async () => {
    try {
      const dayDocRef = doc(db, 'days', 'new');
        const daySnap = await getDoc(dayDocRef);
        console.log('daySnap:', daySnap)
      if (daySnap.exists()) {
        return daySnap.data().buttonsData;
      } else {
        return [];
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
        state.buttonsData = action.payload;
      })
      .addCase(fetchDataFromDatabase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setButtonsData } = habitTrackerSlice.actions;

export default habitTrackerSlice.reducer;
