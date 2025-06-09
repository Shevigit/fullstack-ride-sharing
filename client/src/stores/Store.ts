


import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./Slices/ApiSlice"; 

import authReducer from "./Slices/authSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

