import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../../lib/types/screen";
import type { User } from "../../../lib/types/user";

const initialState: AuthState = {
  user: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.initialized = true;
    },

    clearAuth: (state) => {
      state.user = null;
      state.initialized = true;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

const AuthReducer = authSlice.reducer;

export default AuthReducer;
