import { Drivers } from "../../components/interfaces/Interface";
import apiSliceDrivers from "./ApiSlice-Drives";


const apiDriverSlice = apiSliceDrivers.injectEndpoints({
    endpoints: (builder) => ({
        getAllDrives: builder.query<Drivers[], void>({
            query: () => "/drives",
            providesTags: ["Drivers"],
        }),
        getDriveById: builder.query<Drivers, string>({
            query: (_id) => `/drives/${_id}`,
            providesTags: ["Drivers"],
        }),
        addDrive: builder.mutation<Drivers, Drivers>({
            query: (newLost) => ({
                url: "/drives",
                method: "POST",
                body: newLost,
            }),
            invalidatesTags: ["Drivers"],
        }),
        updateDrive: builder.mutation<Drivers, Drivers>({
            query: (updateLost) => ({
                url: `/drives/${updateLost._id}`,
                method: "PUT",
                body: updateLost,
            }),
            invalidatesTags: ["Drivers"],
        }),
        deleteDrive: builder.mutation<Drivers, Drivers>({
            query: (deleteLost) => ({
                url: `/drives/${deleteLost._id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Drivers"],
        }),
       
    }),
});

export const {
    useGetAllDrivesQuery,
    useGetDriveByIdQuery,
    useAddDriveMutation,
    useUpdateDriveMutation,
    useDeleteDriveMutation,
  
} = apiDriverSlice;
export default apiDriverSlice