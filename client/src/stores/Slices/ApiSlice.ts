


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Cookies } from "react-cookie";

// const cookies = new Cookies();

// const ApiSlice = createApi({
//   reducerPath: "api",

//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:7002/api",
//     prepareHeaders: (headers) => {
//       const token = cookies.get("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),

//   tagTypes: ["User", "Post", "Drives", "LoginCredentials"],

//   endpoints: () => ({}),
// });

// export default ApiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const ApiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7002/api",
    prepareHeaders: (headers) => {
      const token = cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["User", "Post", "Drives", "LoginCredentials","City"],

//  endpoints: (builder) => ({
//    getCities: builder.query({
//      query: () => "/cities",
//    }),
//   }),
endpoints:()=>({})
});

//export const { useGetCitiesQuery } = ApiSlice; // 👈 חובה לייצא את ה-hook
export default ApiSlice;
