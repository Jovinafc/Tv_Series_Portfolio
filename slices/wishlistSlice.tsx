import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistSeries: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.wishlistSeries = [action.payload.items, ...state.wishlistSeries];
    },
    getWishList: (state, action) => {
      state.wishlistSeries = action.payload.wishlist;
    },
    removeFromWishList: (state, action) => {
      state.wishlistSeries = state.wishlistSeries.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToWishList, getWishList, removeFromWishList } =
  wishlistSlice.actions;

export const wishlistSeries = (state) => state.wishlist.wishlistSeries;

export default wishlistSlice.reducer;
