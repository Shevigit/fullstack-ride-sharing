import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from './Slices/UserApiSlice';
import ApiSlice from "./Slices/ApiSlice";

const store = configureStore({
    reducer: {
        //login: LoginReducer,
        [ApiSlice.reducerPath]: ApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(ApiSlice.middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
