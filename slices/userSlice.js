import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      state.user = JSON.parse(localStorage.getItem('user'));
    },
    logout: (state, action) => {
      localStorage.removeItem('user');
      state.user = null;
    },
    load_user: (state, action) => {
      state.user = JSON.parse(localStorage.getItem('user'));
    },
  },
});

export const { login, logout, load_user } = userSlice.actions;

export const userData = (state) => state.user.user;

export default userSlice.reducer;
