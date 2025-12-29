

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Cookies } from "react-cookie";

// const cookies = new Cookies();
// console.log("All cookies:", cookies.getAll());
// const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:7002",
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//       const { Cookies } = require('react-cookie');
//       const cookiesLocal = new Cookies();
//       const token = cookiesLocal.get("token") || localStorage.getItem("token");
//       console.log("Token from cookies (prepareHeaders):", token);
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["User", "Post", "Drives", "LoginCredentials", "City", "Comment", "Driver"],
//   endpoints: () => ({}),

// });

// export default apiSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";

const cookiesLocal = new Cookies();
console.log("All cookies:", cookiesLocal.getAll());

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7002",
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = cookiesLocal.get("token") || localStorage.getItem("token");
      console.log("Token from cookies (prepareHeaders):", token);
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
