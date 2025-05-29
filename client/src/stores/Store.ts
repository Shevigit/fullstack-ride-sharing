// // import { configureStore } from "@reduxjs/toolkit";
// // import LoginReducer from './Slices/UserApiSlice';
// // import ApiSlice from "./Slices/ApiSlice";
// // import apiSliceDriver from "./Slices/apiSliceDrivers";
// // import ApiSliceCommets from "./Slices/ApiSliceComments";

// // const store = configureStore({
// //   reducer: {
// //     //login: LoginReducer,
// //     [ApiSlice.reducerPath]: ApiSlice.reducer,
// //     [apiSliceDriver.reducerPath]: apiSliceDriver.reducer,
// //     [ApiSliceCommets.reducerPath]: ApiSliceCommets.reducer
// //   },
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware().concat(
// //       ApiSlice.middleware,
// //       apiSliceDriver.middleware,
// //       ApiSliceCommets.middleware
// //     )
// // });

// // export type RootState = ReturnType<typeof store.getState>;
// // export type AppDispatch = typeof store.dispatch;

// // export default store;



// import { configureStore } from "@reduxjs/toolkit";
// import LoginReducer from './Slices/UserApiSlice';
// import ApiSlice from "./Slices/ApiSlice";
// import apiSliceDriver from "./Slices/apiSliceDrivers";
// import ApiSliceCommets from "./Slices/ApiSliceComments";
// import cityReducer from "./Slices/citiesSlice"; // 👈 ייבוא

// const store = configureStore({
//   reducer: {
//     // login: LoginReducer,
//     [ApiSlice.reducerPath]: ApiSlice.reducer,
//     [apiSliceDriver.reducerPath]: apiSliceDriver.reducer,
//     [ApiSliceCommets.reducerPath]: ApiSliceCommets.reducer,
//     cities: cityReducer, // 👈 הוספה רגילה של slice
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       ApiSlice.middleware,
//       apiSliceDriver.middleware,
//       ApiSliceCommets.middleware
//     ),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;


import { configureStore } from "@reduxjs/toolkit";
// import LoginReducer from './Slices/UserApiSlice';
import ApiSlice from "./Slices/ApiSlice";
import apiSliceDriver from "./Slices/apiSliceDrivers";
import ApiSliceCommets from "./Slices/ApiSliceComments";

import { streetApi } from "./Slices/streetSlice"; 
//import citiesApi from "./Slices/citiesApi";

const store = configureStore({
  reducer: {
    // login: LoginReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    [apiSliceDriver.reducerPath]: apiSliceDriver.reducer,
    [ApiSliceCommets.reducerPath]: ApiSliceCommets.reducer,
    [streetApi.reducerPath]: streetApi.reducer, 
  //  [citiesApi.reducerPath]:citiesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ApiSlice.middleware,
      apiSliceDriver.middleware,
      ApiSliceCommets.middleware,
      streetApi.middleware 
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
