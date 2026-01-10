import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/v1/students/";

// ১. Fetch All Students
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
      return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to fetch");
    }
  }
);

// ২. Add Student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.post(`${API}`, studentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to add student");
    }
  }
);

// ৩. Update Student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.put(`${API}${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || "Update failed");
    }
  }
);

// ৪. Delete Student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await axios.delete(`${API}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || "Delete failed");
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllStudents.pending, (state) => { state.loading = true; })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Student
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.students.unshift(action.payload);
      })
      
      // Update Student
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.students.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload; 
        }
      })
      
      // Delete Student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s._id !== action.payload);
      });
  },
});

export const { clearStatus } = studentSlice.actions;
export default studentSlice.reducer;