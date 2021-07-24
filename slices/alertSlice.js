import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alertType: '',
  alertMessage: '',
  alertDisplay: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      (state.alertType = action.payload.alert_type),
        (state.alertMessage = action.payload.alert_message),
        (state.alertDisplay = true);
    },
    removeAlert: (state, action) => {
      (state.alertType = action.payload.alert_type),
        (state.alertMessage = action.payload.alert_message),
        (state.alertDisplay = false);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export const alertData = (state) => state.alert;

export default alertSlice.reducer;
