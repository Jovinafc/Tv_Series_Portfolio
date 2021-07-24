import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import pageReducer from '../slices/pageSlice';
import watchedReducer from '../slices/watchedlistSlice';
import wishlistReducer from '../slices/wishlistSlice';
import userReducer from '../slices/userSlice';
import alertReducer from '../slices/alertSlice';

export const store = configureStore({
  reducer: {
    watched: watchedReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    alert: alertReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
