import type { AppRootState } from "../../../lib/types/screen";

export const selectAuth = (state: AppRootState) => state.auth;

export const selectUser = (state: AppRootState) => state.auth.user;

export const selectIsAuthenticated = (state: AppRootState) =>
  Boolean(state.auth.user);
