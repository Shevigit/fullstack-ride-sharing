// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Cookies } from 'react-cookie';

// const cookies = new Cookies();
// const apiSliceDriver = createApi({
//     reducerPath: "drivers",
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:7002',
//         credentials: 'include',
//         prepareHeaders: (headers) => {
//             const token = cookies.get('token'); 
//             if (token) {
//                 headers.set('Authorization', `Bearer ${token}`);
//             }
//             return headers;
//         },
//     }),
//     tagTypes: ["Driver"],
//  endpoints: () => ({
        
//     }),
// });

// export default apiSliceDriver;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export interface City {
  id: number;
  name: string;
}

const apiSliceDriver = createApi({
  reducerPath: "drivers",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7002',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = cookies.get('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Driver", "City"],
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      query: () => "/api/cities",
      providesTags: ["City"],
    }),
  }),
});

export const { useGetCitiesQuery } = apiSliceDriver;
export default apiSliceDriver;

