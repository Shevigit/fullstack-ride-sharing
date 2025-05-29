import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const ApiSliceCommets = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7002",
    prepareHeaders: (headers) => {
      const token = cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Comment"],
  endpoints: () => ({}),
});

export default ApiSliceCommets;
