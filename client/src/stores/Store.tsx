import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from './Slices/UserApiSlice';
import ApiSlice from "./Slices/ApiSlice";
import apiSliceDrivers from "./Slices/ApiSlice-Drives";

const store = configureStore({
    reducer: {
        //login: LoginReducer,
        [ApiSlice.reducerPath]: ApiSlice.reducer,
        [apiSliceDrivers.reducerPath]:apiSliceDrivers.reducer
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSliceDrivers.middleware,
      ApiSlice.middleware,
    
  )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
