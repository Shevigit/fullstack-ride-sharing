
import { createApi } from "@reduxjs/toolkit/query/react";
import {  fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ApiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:7002/api'}),
tagTypes:["User","post","LoginCredentials"],
endpoints:()=>({})
})

export default ApiSlice
