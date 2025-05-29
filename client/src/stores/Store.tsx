import { configureStore } from "@reduxjs/toolkit";

import ApiSlice from "./Slices/ApiSlice";
import apiSliceDriver from "./Slices/apiSliceDrivers";
import ApiSliceCommets from "./Slices/ApiSliceComments";
import UserSlice from "./Slices/UserSlice"

const store = configureStore({
  reducer: {
    user: UserSlice,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    [apiSliceDriver.reducerPath]: apiSliceDriver.reducer,
    [ApiSliceCommets.reducerPath]: ApiSliceCommets.reducer,
  
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
