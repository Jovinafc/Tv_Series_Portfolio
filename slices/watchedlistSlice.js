import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  watchedSeries: [],
};

export const watchedlistSlice = createSlice({
  name: 'watched',
  initialState,
  reducers: {
    addToWatchedList: (state, action) => {
      state.watchedSeries = [action.payload.items, ...state.watchedSeries];
    },
    getWatchedList: (state, action) => {
      state.watchedSeries = action.payload.watchedList;
    },
    removeFromWatchList: (state, action) => {
      state.watchedSeries = state.watchedSeries.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToWatchedList, getWatchedList, removeFromWatchList } =
  watchedlistSlice.actions;

export const watchedSeries = (state) => state.watched.watchedSeries;

export default watchedlistSlice.reducer;
