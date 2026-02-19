import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "/api/v1/marks"; 


export const saveBulkMarks = createAsyncThunk(
  "marks/saveBulk",
  async (marksData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/save-bulk`, marksData);
      toast.success(data.message);
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const getMarksBySubject = createAsyncThunk(
  "marks/fetchBySubject",
  async ({ examId, subjectId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/get-by-subject`, {
        params: { examId, subjectId },
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const getStudentOwnResult = createAsyncThunk(
  "marks/fetchStudentResult",
  async (examId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/my-result/${examId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const markSlice = createSlice({
  name: "marks",
  initialState: {
    marksList: [],      
    studentResult: [], 
    loading: false,
    error: null,
  },
  reducers: {
    clearMarkError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Bulk Save
      .addCase(saveBulkMarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveBulkMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.marksList = action.payload;
      })
      .addCase(saveBulkMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Marks by Subject
      .addCase(getMarksBySubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarksBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.marksList = action.payload;
      })
      .addCase(getMarksBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Student Own Result
      .addCase(getStudentOwnResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentOwnResult.fulfilled, (state, action) => {
        state.loading = false;
        state.studentResult = action.payload;
      })
      .addCase(getStudentOwnResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMarkError } = markSlice.actions;
export default markSlice.reducer;