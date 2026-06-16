import type { RootState } from '@/redux/store';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthStatus = (state: RootState) => state.auth.status;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.status === 'authenticated' && state.auth.user !== null;

export const selectUserRole = (state: RootState) => state.auth.user?.role;
