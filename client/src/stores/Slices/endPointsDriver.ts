import { Driver ,CreateSuggestionPayload} from "../../components/interfaces/Interface";
import apiSliceDriver from "./ApiSlice";

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
   

        joinSuggestion: builder.mutation<Driver, { suggestionId: string; userId: string ,countSeat:number}>({
  query: ({ suggestionId, userId,countSeat }) => ({
    url: `/drivers/${suggestionId}/joinSuggestion`,
    method: "PUT",

    body: { userId ,countSeat},
        
  }),
  invalidatesTags: ["Driver"],
}),
createSuggestion: builder.mutation<Driver, CreateSuggestionPayload>({
  query: (newSuggestion) => ({
    url: "/drivers/createSuggestion",
    method: "POST",
    body: newSuggestion,
  }),
  invalidatesTags: ["Driver"],
}),

getDriverSuggestions: builder.query<Driver[], string>({
  query: (driverId) => `/drivers/driver/${driverId}`,
  providesTags: ["Driver"],
}),
getPassengerSuggestions: builder.query<Driver[], string>({
  query: (userId) => `/drivers/passenger/${userId}`,
  providesTags: ["Driver"],
}),

    }),
    
});

export const {
    useGetAlldriversQuery,
    useGetdriverByIdQuery,
    useAdddriverMutation,
    useUpdatedriverMutation,
    useDeletedriverMutation,
    useJoinSuggestionMutation,
    useCreateSuggestionMutation,
    useGetDriverSuggestionsQuery,
    useGetPassengerSuggestionsQuery
} = apiDriverSlice;
export default apiDriverSlice