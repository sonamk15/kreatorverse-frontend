import { createSlice } from '@reduxjs/toolkit';
import authInitialState from '../initialStates/authInitialState';

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuthToken(state, action) {
      return { ...state, ...action.payload };
    },
    revertAuth() {
      return { ...authInitialState };
    }
  }
});

export const { setAuthToken, revertAuth } = authSlice.actions;

export default authSlice.reducer;
