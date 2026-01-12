import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/v1/admin";

/* =========================
   ADMIN LOGIN
========================= */
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/login`, formData);
      return res.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

/* =========================
   CREATE / REGISTER ADMIN
========================= */
export const createAdmin = createAsyncThunk(
  "auth/createAdmin",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/register`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Admin creation failed"
      );
    }
  }
);

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"), 
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      state.success = false;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      /* ---------- LOGIN ---------- */
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        // API থেকে আসা পুরো ডাটা বা admin অবজেক্টটি সেভ করা
        state.admin = action.payload.admin || action.payload; 
        state.isAuthenticated = true; 
        state.success = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      /* ---------- CREATE ADMIN ---------- */
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;