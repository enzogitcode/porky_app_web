// store/slices/authSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { baseURL } from '../baseURL';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// THUNK: login
interface LoginPayload {
  username: string;
  pin: string;
}

export const loginUser = createAsyncThunk<User, LoginPayload, { rejectValue: string }>(
  'auth/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: payload.username, pin: payload.pin }),
        credentials: 'include', // ✅ cookies HttpOnly
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login fallido');
      }

      // 🔹 Ajustamos según tu backend: si devuelve { id, username }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error desconocido');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login fallido';
      });
  },
});

export const { logout } = authSlice.actions;

// SELECTORES
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
