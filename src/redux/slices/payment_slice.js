import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/v1/manual_payment";

// --- Thunks ---

// 1. Student Payment Submit (Automatic Email সহ)
export const submitStudentPayment = createAsyncThunk(
    'payment/submit',
    async (paymentData, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            // studentSlice theke token ar email nouchi
            const token = state.student?.token || localStorage.getItem('studentToken');
            const studentEmail = state.student?.student?.email;

            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            // Payment data-r sathe email thakle seta add kore deya
            const finalData = { 
                ...paymentData, 
                email: studentEmail // Apnar student model-er email ekhane auto jabe
            };

            const response = await axios.post(`${API_URL}/`, finalData, config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 2. Admin Create Payment
export const adminCreatePayment = createAsyncThunk(
    'payment/adminCreate',
    async (paymentData, thunkAPI) => {
        try {
            // Admin-er ক্ষেত্র সাধারণত auth slice use hoy
            const token = thunkAPI.getState().auth?.token || localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`${API_URL}/admin-create`, paymentData, config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getMyPaymentHistory = createAsyncThunk(
    'payment/myHistory',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            
            const token = state.student?.token || localStorage.getItem('studentToken');

            if (!token) {
                return thunkAPI.rejectWithValue("No token found. Please login again.");
            }

            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_URL}/histry/`, config);
            
            console.log("API Response:", response.data);
            return response.data; 
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 4. Get All Payments (Admin)
export const getAllPayments = createAsyncThunk(
    'payment/all',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_URL}/all_payment`, config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// --- Slice ---

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payments: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetPaymentState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Submit Payment
            .addCase(submitStudentPayment.pending, (state) => { 
                state.loading = true; 
            })
            .addCase(submitStudentPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                if (action.payload.data) {
                    state.payments.unshift(action.payload.data);
                }
            })
            .addCase(submitStudentPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get History (Student)
            .addCase(getMyPaymentHistory.pending, (state) => { 
                state.loading = true; 
            })
            .addCase(getMyPaymentHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                // Array check kore data set kora
                state.payments = action.payload.data || [];
            })
            .addCase(getMyPaymentHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Admin: All Payments
            .addCase(getAllPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload.data || [];
            });
    }
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;