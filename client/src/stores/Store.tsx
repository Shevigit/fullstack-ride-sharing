import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from './Slices/UserApiSlice';
import ApiSlice from "./Slices/ApiSlice";
import apiSliceDriver from "./Slices/apiSliceDrivers";
import ApiSliceCommets from "./Slices/ApiSliceComments";

const store = configureStore({
  reducer: {
    //login: LoginReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    [apiSliceDriver.reducerPath]: apiSliceDriver.reducer,
    [ApiSliceCommets.reducerPath]: ApiSliceCommets.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ApiSlice.middleware,
      apiSliceDriver.middleware,
      ApiSliceCommets.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
