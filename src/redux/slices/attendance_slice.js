import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/attendance";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchAttendanceSheet = createAsyncThunk(
  "attendance/fetchSheet",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/sheet/${sectionId}`, getAuthHeader());
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch sheet");
    }
  }
);

export const submitAttendance = createAsyncThunk(
  "attendance/submit",
  async (attendanceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/submit`, attendanceData, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Submission failed");
    }
  }
);

export const fetchStudentStats = createAsyncThunk(
  "attendance/fetchStudentStats",
  async ({ studentId, sectionId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/student/${studentId}/${sectionId}`, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch stats");
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    sheet: {
      status: "idle", // 'open', 'holiday', 'off', 'submitted'
      students: [],
      message: "",
      submittedData: null
    },
    studentStats: null,
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    resetAttendanceState: (state) => {
      state.success = false;
      state.error = null;
      state.sheet = { status: "idle", students: [], message: "", submittedData: null };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Sheet
      .addCase(fetchAttendanceSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceSheet.fulfilled, (state, action) => {
        state.loading = false;
        state.sheet.status = action.payload.status;
        state.sheet.students = action.payload.students || [];
        state.sheet.message = action.payload.message || "";
        state.sheet.submittedData = action.payload.data || null;
      })
      .addCase(fetchAttendanceSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit Attendance
      .addCase(submitAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitAttendance.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.sheet.status = 'submitted';
      })
      .addCase(submitAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Student Stats
      .addCase(fetchStudentStats.fulfilled, (state, action) => {
        state.studentStats = action.payload;
      });
  }
});

export const { resetAttendanceState } = attendanceSlice.actions;
export default attendanceSlice.reducer;