import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/subject";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. Fetch All Subjects
export const fetchSubjects = createAsyncThunk(
    "subjects/fetchSubjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/`, getAuthHeader());
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Subjects fetch failed");
        }
    }
);

// 2. Create Subject
export const createSubject = createAsyncThunk(
    "subjects/createSubject",
    async (subjectData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/`, subjectData, getAuthHeader());
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Create failed");
        }
    }
);

// 3. Update Subject
export const updateSubject = createAsyncThunk(
    "subjects/updateSubject",
    async ({ id, subjectData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}`, subjectData, getAuthHeader());
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Update failed");
        }
    }
);

// 4. Delete Subject
export const deleteSubject = createAsyncThunk(
    "subjects/deleteSubject",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, getAuthHeader());
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const subjectSlice = createSlice({
    name: "subjects",
    initialState: {
        subjects: [],
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        clearSubjectState: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubjects.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects = action.payload;
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSubject.fulfilled, (state, action) => {
                state.subjects.push(action.payload);
                state.success = true;
            })
            .addCase(deleteSubject.fulfilled, (state, action) => {
                state.subjects = state.subjects.filter(s => s._id !== action.payload);
            });
    }
});

export const { clearSubjectState } = subjectSlice.actions;
export default subjectSlice.reducer;