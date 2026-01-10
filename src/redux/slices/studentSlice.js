import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/v1/students/";

// fetch all students (all schools)
export const fetchAllStudents = createAsyncThunk(
  "students/fetchAllStudents",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(`${API}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch students"
      );
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
