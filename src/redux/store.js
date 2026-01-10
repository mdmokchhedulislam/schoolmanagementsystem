import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import schoolReducer from "./slices/schoolSlice"
import studentReducer from "./slices/studentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    school: schoolReducer,
    students: studentReducer
  }
});

export default store