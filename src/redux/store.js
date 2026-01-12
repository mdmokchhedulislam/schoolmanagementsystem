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

const rootReducer = combineReducers({
  auth: authReducer,
  school: schoolReducer,
  students: studentsReducer,
  classes: classReducer,
  academicYears: academicYearReducer,
  teachers: teachersReducer,
  student:studentReducer
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