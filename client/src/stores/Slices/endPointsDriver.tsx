import { Driver } from "../../components/interfaces/Interface";
import apiSliceDriver from "./apiSliceDrivers";

const apiDriverSlice = apiSliceDriver.injectEndpoints({
    endpoints: (builder) => ({
        getAlldrivers: builder.query<Driver[], void>({
            query: () => "/drivers",
            providesTags: ["Driver"],
        }),
        getdriverById: builder.query<Driver, string>({
            query: (_id) => `/drivers/${_id}`,
            providesTags: ["Driver"],
          }),
      
        adddriver: builder.mutation<Driver, Driver>({
            query: (newdriver) => ({
                url: "/drivers",
                method: "POST",
                body: newdriver,
            }),
            invalidatesTags: ["Driver"],
        }),
        updatedriver: builder.mutation<Driver, Driver>({
            query: (updatedriver) => ({
                url: `/drivers/${updatedriver.driver._id}`,
                method: "PUT",
                body: updatedriver,
            }),
            invalidatesTags: ["Driver"],
        }),
        deletedriver: builder.mutation<Driver, Driver>({
            query: (deletedriver) => ({
                url: `/drivers/${deletedriver.driver._id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Driver"],
        }),
        
    }),
});

export const {
    useGetAlldriversQuery,
    useGetdriverByIdQuery,
    useAdddriverMutation,
    useUpdatedriverMutation,
    useDeletedriverMutation,
    
} = apiDriverSlice;
export default apiDriverSlice