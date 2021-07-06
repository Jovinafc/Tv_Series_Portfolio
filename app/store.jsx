import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import pageReducer from '../slices/pageSlice';
import watchedReducer from '../slices/watchedlistSlice';
import wishlistReducer from '../slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    watched: watchedReducer,
    wishlist: wishlistReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
