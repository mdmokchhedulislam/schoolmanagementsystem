import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000/api/v1/result"; 

export const saveBulkMarks = createAsyncThunk(
  "marks/saveBulk",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${API_URL}/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message || "Marks saved successfully!");
      return data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getMarksBySubject = createAsyncThunk(
  "marks/fetchBySubject",
  async ({ examId, subjectId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_URL}/get-by-subject`, {
        params: { examId, subjectId },
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch marks");
    }
  }
);

export const getStudentOwnResult = createAsyncThunk(
  "marks/fetchStudentResult",
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_URL}/student/${examId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // আমরা এখানে data.data এবং examId দুটোই রিটার্ন করছি যাতে extraReducers এ ফিল্টার করা যায়
      return { result: data.data, requestedExamId: examId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch result");
    }
  }
);

const markSlice = createSlice({
  name: "marks",
  initialState: {
    marksList: [],
    studentResult: null, // এখানে কেবল একটি নির্দিষ্ট রেজাল্ট অবজেক্ট বা অ্যারে থাকবে
    loading: false,
    error: null,
  },
  reducers: {
    clearMarkError: (state) => {
      state.error = null;
    },
    // নতুন একটা রিডিউসার যোগ করলাম যাতে ভিউ চেঞ্জ করলে আগের রেজাল্ট ক্লিন হয়ে যায়
    clearStudentResult: (state) => {
      state.studentResult = null;
    }
  },
  extraReducers: (builder) => {
    builder
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
    
      .addCase(getStudentOwnResult.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.studentResult = null; // নতুন রিকোয়েস্ট শুরু হলে আগের ডাটা মুছে দিচ্ছি
      })
      .addCase(getStudentOwnResult.fulfilled, (state, action) => {
        state.loading = false;
        
        const { result, requestedExamId } = action.payload;

        // যদি API থেকে অ্যারে আসে, তবে কেবল সেই আইডি-র ডাটা রাখবো
        if (Array.isArray(result)) {
            state.studentResult = result.filter(r => 
                (r.examId?._id || r.examId) === requestedExamId
            );
        } else {
            // যদি সিঙ্গেল অবজেক্ট আসে তবে সরাসরি চেক করে সেট করবো
            const actualExamId = result?.examId?._id || result?.examId;
            state.studentResult = actualExamId === requestedExamId ? result : null;
        }
        
        state.error = null;
      })
      .addCase(getStudentOwnResult.rejected, (state, action) => {
        state.loading = false;
        state.studentResult = null; 
        state.error = action.payload;
      });
  },
});

export const { clearMarkError, clearStudentResult } = markSlice.actions;
export default markSlice.reducer;