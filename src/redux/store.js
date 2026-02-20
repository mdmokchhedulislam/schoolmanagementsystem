import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 


import authReducer from "./slices/authSlice";
import schoolReducer from "./slices/schoolSlice";
import studentsReducer from "./slices/studentSlice";
import classReducer from "./slices/classSlice";
import academicYearReducer from "./slices/academicYearSlice";
import teachersReducer from "./slices/teacherSlice";
import studentReducer from "./slices/student/studentSlice";
import sectionReducer from "./slices/sectionSlice";
import classAssainReducer from "./slices/class_assainSlice";
import paymentReducer from "./slices/payment_slice";
import routineReducer from "./slices/routine_slice";
import daysReducer from "./slices/daySlice";
import periodsReducer from "./slices/period_slice";
import subjectsReducer from "./slices/subject_slice";
import attendanceReducer from "./slices/attendance_slice";
import holidaysReducer from "./slices/holiday_slice";
import marksReducer from "./slices/result_slice";
import examsReducer from "./slices/examSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  school: schoolReducer,
  students: studentsReducer,
  classes: classReducer,
  academicYears: academicYearReducer,
  teachers: teachersReducer,
  student:studentReducer,
  sections:sectionReducer,
  classAssain:classAssainReducer,
  payment:paymentReducer,
  routine: routineReducer,
  days: daysReducer,
  periods:periodsReducer,
  subjects:subjectsReducer,
  attendance:attendanceReducer,
  holidays:holidaysReducer,
  marks:marksReducer,
  exams:examsReducer
});


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "school"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;