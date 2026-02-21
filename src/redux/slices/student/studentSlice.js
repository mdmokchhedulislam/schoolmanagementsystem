import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/students'; 

export const loginStudent = createAsyncThunk(
    'student/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('userRole', 'student'); 
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const getMyProfile = createAsyncThunk(
    'student/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/profile/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
        }
    }
);

export const getStudentsByClassAndSection = createAsyncThunk(
    'student/getByClassAndSection',
    async ({ classId, sectionId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/${classId}/${sectionId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
        }
    }
);

const initialState = {
    student: null,
    studentsList: [], 
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        logoutStudent: (state) => {
            state.student = null;
            state.studentsList = [];
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.student = action.payload.data; 
                state.isAuthenticated = true;
            })
            .addCase(loginStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getMyProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload; 
                state.isAuthenticated = true;
            })
            .addCase(getMyProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (action.payload === "jwt expired" || action.payload === "Please login first") {
                    state.isAuthenticated = false;
                    localStorage.removeItem('token');
                    state.token = null;
                }
            })
            .addCase(getStudentsByClassAndSection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStudentsByClassAndSection.fulfilled, (state, action) => {
                state.loading = false;
                state.studentsList = action.payload;
            })
            .addCase(getStudentsByClassAndSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logoutStudent, clearError } = studentSlice.actions;
export default studentSlice.reducer;