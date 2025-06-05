
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

//   tagTypes: ["User", "Post", "Drives", "LoginCredentials","City"],

// endpoints:()=>({})
// });


// export default ApiSlice;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Cookies } from "react-cookie";

// const cookies = new Cookies();

// const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:7002",
//     credentials: "include",
//     prepareHeaders: (headers) => {
//       const token = cookies.get("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["User", "Driver", "Drives", "Comment", "LoginCredentials", "City"],
//   endpoints: () => ({}),
// });

// export default apiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7002",
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Post", "Drives", "LoginCredentials", "City", "Comment", "Driver"],
  endpoints: () => ({}),
});

export default apiSlice;