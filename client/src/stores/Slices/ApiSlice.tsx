import { createApi } from "@reduxjs/toolkit/query/react";
import {  fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
const ApiSlice=createApi({
    reducerPath:"api",

    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:7002/api'}),
tagTypes:["User","post","Drives"],


    // baseQuery:fetchBaseQuery({
    //     baseUrl:'http://localhost:7002/api',

    //     // credentials: 'include', 
    //     prepareHeaders: (headers) => {
    //         const token = cookies.get('token'); 
    //         if (token) {
    //           headers.set('Authorization', `Bearer ${token}`);
    //         }
    //         return headers;
    //     },
        // credentials: 'include', 
        // prepareHeaders: (headers) => {
        //     const token = cookies.get('token'); 
        //     if (token) {
        //       headers.set('Authorization', `Bearer ${token}`);
        //     }
        //     return headers;
        // },
    // }),
tagTypes:["User","post","LoginCredentials"],
endpoints:()=>({})
})
export default ApiSlice



