//import { City } from "./ApiSlice"; // אם ההגדרה שם
import ApiSlice from "./ApiSlice";

export interface City {
  id: number;
  name: string;
}

const citiesApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      query: () => "/geoRoutes/cities",
      providesTags: ["City"],
      keepUnusedDataFor: 60 * 60,
    }),
  }),
});

export const { useGetCitiesQuery } = citiesApi;
export default citiesApi;