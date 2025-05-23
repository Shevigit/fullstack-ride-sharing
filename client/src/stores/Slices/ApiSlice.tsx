import { createApi } from "@reduxjs/toolkit/query/react";
import {  fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
const ApiSlice=createApi({
    reducerPath:"api",
<<<<<<< HEAD
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:7002/api'}),
tagTypes:["User","post","Drives"],
=======
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:7002/api',
<<<<<<< HEAD
       // credentials: 'include', 
        prepareHeaders: (headers) => {
            const token = cookies.get('token'); 
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
=======
        // credentials: 'include', 
        // prepareHeaders: (headers) => {
        //     const token = cookies.get('token'); 
        //     if (token) {
        //       headers.set('Authorization', `Bearer ${token}`);
        //     }
        //     return headers;
        // },
>>>>>>> 05e8e3ab390df7da869d539b9333ec63b0d69267
    }),
tagTypes:["User","post","LoginCredentials"],
>>>>>>> 05e8e3ab390df7da869d539b9333ec63b0d69267
endpoints:()=>({})
})
export default ApiSlice



