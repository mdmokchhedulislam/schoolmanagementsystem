import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/students'; 

// Login Thunk (Student Phone ar Password diye login korbe)
export const loginStudent = createAsyncThunk(
    'student/login',
    async (credentials, { rejectWithValue }) => {
        try {
            // credentials = { phone, password }
            const response = await axios.post(`${API_URL}/login`, credentials);
            
            // Token ar Role save rakhi
            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('userRole', 'student'); 
            
            return response.data; // Eikhane { success, token, data: studentObj } thake
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Profile Thunk
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

const initialState = {
    student: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const studentSlice = createSlice({
    name: 'student', // Eita 'student' e thakbe jate useSelector-e state.student pawa jay
    initialState,
    reducers: {
        logoutStudent: (state) => {
            state.student = null;
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
            // Login Handlers
            .addCase(loginStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                // Backend theke jodi action.payload.data-te student details thake:
                state.student = action.payload.data; 
                state.isAuthenticated = true;
            })
            .addCase(loginStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Profile Handlers
            .addCase(getMyProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload; // Direct student object
                state.isAuthenticated = true;
            })
            .addCase(getMyProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // Token expire hole clean up
                if (action.payload === "jwt expired" || action.payload === "Please login first") {
                    state.isAuthenticated = false;
                    localStorage.removeItem('token');
                    state.token = null;
                }
            });
    }
});

export const { logoutStudent, clearError } = studentSlice.actions;
export default studentSlice.reducer;