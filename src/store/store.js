import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieoSlice';

export const store = configureStore({
  reducer: {

    movieData: movieReducer
  },
})

