import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Register User
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(`/api/v1/auth/register`, user, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed please try again later.",
      );
    }
  },
);

//  Login User
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`/api/v1/auth/login`, user, config);
      return {
        user: data.user,
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed please try again later.",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user || null;
        state.isAuthenticated = Boolean(action.payload.user);
        state.success = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Login failed please try again.";
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { login, logout, removeError, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
