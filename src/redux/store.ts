import {configureStore} from '@reduxjs/toolkit';
import bmiSlice from './bmiSlice';

const store = configureStore({
  reducer: {
    root: bmiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
