import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/v1/admin";

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

export const getAdminProfile = createAsyncThunk(
  "auth/getAdminProfile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(`${API}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
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
      state.admin = null;
      state.token = null;
      state.role = null;
      state.schoolId = null;
      state.isAuthenticated = false;
      state.success = false;
      state.error = null;
      
      localStorage.removeItem("token");
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("role");
      localStorage.removeItem("schoolId");
    },
    resetAuthState: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true; 
        
        const { token, role, schoolId } = action.payload;
        const adminData = action.payload.admin || action.payload;

        state.token = token;
        state.role = role;
        state.schoolId = schoolId;
        state.admin = adminData;

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
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.admin = action.payload;
      });
  }
});

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;