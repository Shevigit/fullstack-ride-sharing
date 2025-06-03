import { Driver, ResDriver } from "../../components/interfaces/Interface";
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
                url: `/drivers/${updatedriver._id}`,
                method: "PUT",
                body: updatedriver,
            }),
            invalidatesTags: ["Driver"],
        }),
        deletedriver: builder.mutation<Driver, Driver>({
            query: (deletedriver) => ({
                url: `/drivers/${deletedriver._id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Driver"],
        }),
        //     addPassengerToSuggestion: builder.mutation<Driver, Driver>({
        //     query: (addPassengerToSuggestion) => ({
        //         url: `/drivers/${addPassengerToSuggestion._id}/addPassengerToSuggestion`,
        //         method: "PUT",
        //         body: addPassengerToSuggestion,

        //     }),
        //     invalidatesTags: ["Driver"],
        // }),


        addPassengerToSuggestion: builder.mutation<Driver, { suggestionId: string; passengerId: string }>({
  query: ({ suggestionId, passengerId }) => ({
    url: `/drivers/${suggestionId}/addPassengerToSuggestion`,
    method: "PUT",
    body: { passengerId },
        
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
    useAddPassengerToSuggestionMutation,
    
} = apiDriverSlice;
export default apiDriverSlice