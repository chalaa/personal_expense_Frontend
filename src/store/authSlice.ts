import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AuthState {
  user: null | { name: string; email: string };
  token: null | string;
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

interface RegisterUserPayload {
  user: { name: string; email: string };
  authorisation : {token: string ; type:string;  status:string };
}

interface LoginUserPayload {
  user: { name: string; email: string };
  authorisation : {token: string ; type:string;  status:string };
}

interface ErrorResponse {
  message: string;
}

export const registerUser = createAsyncThunk<
  RegisterUserPayload,
  { name: string; email: string; password: string },
  { rejectValue: ErrorResponse }
>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", userData);
      
      return response.data;
    } catch (error) {
      let errorMessage = 'An error occurred';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const loginUser = createAsyncThunk<
  LoginUserPayload,
  { email: string; password: string },
  { rejectValue: ErrorResponse }
>(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', userData);
      return response.data;
    } catch (error) {
      let errorMessage = 'An error occurred';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterUserPayload>) => {
        state.loading = false;
        state.user = {name:action.payload.user.name,email:action.payload.user.email};
        state.token = action.payload.authorisation.token;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to register';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginUserPayload>) => {
        state.loading = false;
        state.user = {name:action.payload.user.name,email:action.payload.user.email};
        state.token = action.payload.authorisation.token;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to login';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
