import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import type { AuthState } from "../../../lib/types/screen";
import type { User } from "../../../lib/types/user";

const cookies = new Cookies();

const loadUser = (): User | null => {
  if (!cookies.get("accessToken")) {
    localStorage.removeItem("userdata");
    return null;
  }

  const stored = localStorage.getItem("userdata");
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (err) {
    console.log("ERROR parsing stored userdata", err);
    localStorage.removeItem("userdata");
    return null;
  }
};

const initialState: AuthState = {
  user: loadUser(),
  initialized: true,
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
      localStorage.removeItem("userdata");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

const AuthReducer = authSlice.reducer;

export default AuthReducer;
