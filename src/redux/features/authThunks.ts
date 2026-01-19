import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess } from './authSlice';

interface LoginPayload {
  name: string;
  pin: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());

      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: payload.name, pin: payload.pin }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      const { access_token } = data;

      // Decodificar token para obtener info del usuario
      const base64Url = access_token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(window.atob(base64));

      dispatch(
        loginSuccess({
          user: { id: decodedPayload.sub, name: decodedPayload.name },
          token: access_token,
        })
      );

      return access_token;
    } catch (error: any) {
      console.error('Login failed:', error);
      return rejectWithValue(error.message || 'Error desconocido');
    }
  }
);
