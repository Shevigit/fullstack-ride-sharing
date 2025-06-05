
import apiSlice from "./ApiSlice";

const streetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStreets: builder.query<string[], { city: string }>({
      query: ({ city }) => `/api/geoRoutes?city=${encodeURIComponent(city)}`,
    }),
  }),
});

export const { useLazyGetStreetsQuery } = streetApi;
export default streetApi;
