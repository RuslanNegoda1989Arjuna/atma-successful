
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import habitTrackerReducer, { fetchDataFromDatabase } from './slice/habitTrackerSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  user: userReducer,
  habitTracker: habitTrackerReducer,
}));

export const store = configureStore({
  reducer: persistedReducer,
//   middleware: [...getDefaultMiddleware()],
});

export const persistor = persistStore(store);

store.dispatch(fetchDataFromDatabase());