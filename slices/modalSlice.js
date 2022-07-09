import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal_display: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modal_display = true;
    },
    hideModal: (state, action) => {
      state.modal_display = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export const modalData = (state) => state.modal;

export default modalSlice.reducer;
