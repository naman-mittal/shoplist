import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../database/models/User';

interface LoginInitialState {
  isSignedIn: boolean;
  user: User | null;
  error: {error: string} | null;
}

const initialState: LoginInitialState = {
  isSignedIn: false,
  user: null,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isSignedIn = true;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
      state.isSignedIn = false;
    },
    clearError: state => {
      state.error = null;
    },
    logoutSuccess: () => initialState,
  },
});

export const {loginSuccess, loginFailed, logoutSuccess} = loginSlice.actions;

export default loginSlice.reducer;
