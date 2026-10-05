import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const readStoredValue = (key: string): string | null => {
  const raw = localStorage.getItem(key);
  return raw && raw !== 'undefined' && raw !== 'null' ? raw : null;
};

const readStoredUser = (): User | null => {
  const raw = readStoredValue('user');
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed !== null && typeof parsed === 'object' ? (parsed as User) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: readStoredUser(),
  token: readStoredValue('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
