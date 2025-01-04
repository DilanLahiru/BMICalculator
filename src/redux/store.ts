import {configureStore} from '@reduxjs/toolkit';
import genderSlice from './genderSlice';

const store = configureStore({
  reducer: {
    gender: genderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
