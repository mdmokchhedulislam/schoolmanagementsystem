import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API = "http://localhost:5000/api/v1/class/";

export const fetchAllClasses = createAsyncThunk(
  "classes/fetchAllClasses",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch classes"
      );
    }
  }
);

export const addClass = createAsyncThunk(
  "classes/addClass",
  async (classData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.post(API, classData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to add class"
      );
    }
  }
);

export const deleteClass = createAsyncThunk(
  "classes/deleteClass",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await axios.delete(`${API}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to delete class"
      );
    }
  }
);

const classSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetClassStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Classes
      .addCase(fetchAllClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchAllClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Class
      .addCase(addClass.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.classes.push(action.payload);
      })
      
      // Delete Class
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter((c) => c._id !== action.payload);
      });
  },
});

export const { resetClassStatus } = classSlice.actions;
export default classSlice.reducer;