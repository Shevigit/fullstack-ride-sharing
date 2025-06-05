import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const streetApi = createApi({
  reducerPath: "streetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7002" }), // תיקון קטן גם בבסיס
  endpoints: (builder) => ({
    getStreets: builder.query<string[], { city: string }>({
      query: ({ city }) => `/geoRoutes?city=${encodeURIComponent(city)}`,
    }),
  }),
});

export const { useLazyGetStreetsQuery } = streetApi;
