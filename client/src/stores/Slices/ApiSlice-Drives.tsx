import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../utils/cookies";


const apiSliceDrivers = createApi({
    reducerPath: "drives",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7002',
        credentials: 'include', 
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Drivers"],
    endpoints: () => ({}),
});

export default apiSliceDrivers;