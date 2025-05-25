// import { createApi } from "@reduxjs/toolkit/query/react";
// import {  fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Cookies } from 'react-cookie';
// const cookies = new Cookies();
// const ApiSlice=createApi({
//     reducerPath:"api",
// <<<<<<< HEAD

//     baseQuery:fetchBaseQuery({baseUrl:'http://localhost:7002/api'}),
// tagTypes:["User","post","Drives"],


//     // baseQuery:fetchBaseQuery({
//     //     baseUrl:'http://localhost:7002/api',

//     //     // credentials: 'include', 
//     //     prepareHeaders: (headers) => {
//     //         const token = cookies.get('token'); 
//     //         if (token) {
//     //           headers.set('Authorization', `Bearer ${token}`);
//     //         }
//     //         return headers;
//     //     },
// =======
//     baseQuery:fetchBaseQuery({
//         baseUrl:'http://localhost:7002/api',
// >>>>>>> 2c666fb639d493fc117214a9790f781c423a2aa0
//         // credentials: 'include', 
//         // prepareHeaders: (headers) => {
//         //     const token = cookies.get('token'); 
//         //     if (token) {
//         //       headers.set('Authorization', `Bearer ${token}`);
//         //     }
//         //     return headers;
//         // },
// <<<<<<< HEAD
//     // }),
// =======
//     }),
// >>>>>>> 2c666fb639d493fc117214a9790f781c423a2aa0
// tagTypes:["User","post","LoginCredentials"],
// endpoints:()=>({})
// })
// export default ApiSlice



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

  tagTypes: ["User", "Post", "Drives", "LoginCredentials"],

  endpoints: () => ({}),
});

export default ApiSlice;
