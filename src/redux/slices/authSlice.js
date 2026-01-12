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
    // রিফ্রেশ করলে যাতে ডাটা না হারায় তাই সব কি আলাদা করে চেক করা
    admin: JSON.parse(localStorage.getItem("adminInfo")) || null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    schoolId: localStorage.getItem("schoolId") || null,
    isAuthenticated: !!localStorage.getItem("token"), 
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    logout: (state) => {
      // ১. রিডাক্স স্টেট ক্লিন করা
      state.admin = null;
      state.token = null;
      state.role = null;
      state.schoolId = null;
      state.isAuthenticated = false;
      state.success = false;
      state.error = null;
      
      // ২. লোকাল স্টোরেজ থেকে সব কি (Keys) মুছে ফেলা
      localStorage.removeItem("token");
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("role");
      localStorage.removeItem("schoolId");

      // হার্ড রিফ্রেশ নিশ্চিত করার জন্য (ঐচ্ছিক)
      console.log("Storage Cleared Successfully");
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
        state.success = true;
        state.isAuthenticated = true; 
        
        // পেলোড থেকে ডাটা আলাদা করা
        const { token, role, schoolId } = action.payload;
        const adminData = action.payload.admin || action.payload;

        state.token = token;
        state.role = role;
        state.schoolId = schoolId;
        state.admin = adminData;

        // লোকাল স্টোরেজে সবগুলো আলাদাভাবে সেভ করা
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("schoolId", schoolId);
        localStorage.setItem("adminInfo", JSON.stringify(adminData));
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