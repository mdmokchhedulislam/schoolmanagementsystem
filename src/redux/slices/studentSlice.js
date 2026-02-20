import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/v1/students/";


const getAuthHeaders = (thunkAPI) => {

  let token = thunkAPI.getState().auth?.token;
  

  if (!token) {
    token = localStorage.getItem("token"); 
  }
  
  return { headers: { Authorization: `Bearer ${token}` } };
};

// ১. Fetch All Students
export const fetchAllStudents = createAsyncThunk(
  "students/fetchAllStudents",
  async (_, thunkAPI) => {
    try {
      const config = getAuthHeaders(thunkAPI);
      
   
      console.log("Requesting with token:", config.headers.Authorization);

      const res = await axios.get(`${API}`, config);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to fetch");
    }
  }
);


export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, thunkAPI) => {
    try {
      const config = getAuthHeaders(thunkAPI);
      const res = await axios.post(`${API}`, studentData, config);
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
      const config = getAuthHeaders(thunkAPI);
      const res = await axios.put(`${API}${id}`, updatedData, config);
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
      const config = getAuthHeaders(thunkAPI);
      await axios.delete(`${API}${id}`, config);
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
      .addCase(fetchAllStudents.pending, (state) => { state.loading = true; })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.students.unshift(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.students.findIndex(s => s._id === action.payload._id);
        if (index !== -1) state.students[index] = action.payload; 
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s._id !== action.payload);
      });
  },
});

export const { clearStatus } = studentSlice.actions;
export default studentSlice.reducer;