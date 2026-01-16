import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/v1/routine";

// Helper function to get token and config
const getConfig = (thunkAPI) => {
  const token = thunkAPI.getState().auth.token || localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

/* =========================
    ADMIN: GET ALL ROUTINE
========================= */
export const getRoutine = createAsyncThunk(
  "routine/getRoutine",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/get_routine`, getConfig(thunkAPI));
      return res.data.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch routine");
    }
  }
);

/* =========================
    TEACHER: GET MY ROUTINE
========================= */
export const getTeacherRoutine = createAsyncThunk(
  "routine/getTeacherRoutine",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/teacher`, getConfig(thunkAPI));
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch teacher routine");
    }
  }
);

/* =========================
    STUDENT: GET MY ROUTINE
========================= */
export const getStudentRoutine = createAsyncThunk(
  "routine/getStudentRoutine",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/student`, getConfig(thunkAPI));
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch student routine");
    }
  }
);

/* =========================
    ADD, UPDATE, DELETE (ADMIN)
========================= */
export const addRoutine = createAsyncThunk(
  "routine/addRoutine",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/create`, formData, getConfig(thunkAPI));
      thunkAPI.dispatch(getRoutine()); 
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add routine");
    }
  }
);



/* =========================
    SLICE
========================= */
const routineSlice = createSlice({
  name: "routine",
  initialState: {
    routineData: [],       
    teacherRoutine: [],    
    studentRoutine: [],    
    loading: false,
    error: null,
    success: false,
    message: ""
  },
  reducers: {
    clearRoutineState: (state) => {
      state.error = null;
      state.success = false;
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
      // GET ADMIN ROUTINE
      .addCase(getRoutine.pending, (state) => { state.loading = true; })
      .addCase(getRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.routineData = action.payload || [];
      })
      .addCase(getRoutine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET TEACHER ROUTINE
      .addCase(getTeacherRoutine.pending, (state) => { state.loading = true; })
      .addCase(getTeacherRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherRoutine = action.payload || [];
      })
      .addCase(getTeacherRoutine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET STUDENT ROUTINE
      .addCase(getStudentRoutine.pending, (state) => { state.loading = true; })
      .addCase(getStudentRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.studentRoutine = action.payload || [];
      })
      .addCase(getStudentRoutine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD ROUTINE
      .addCase(addRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      });
      
    
  }
});

export const { clearRoutineState } = routineSlice.actions;
export default routineSlice.reducer;