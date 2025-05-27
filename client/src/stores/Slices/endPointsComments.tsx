import { Comment } from "../../components/interfaces/Interface";
import ApiSliceCommets from "./ApiSliceComments";
const apiCommentSlice = ApiSliceCommets.injectEndpoints({
    endpoints: (builder) => ({
        getAllcomments: builder.query<Comment[], void>({
            query: () => "/comments",
            providesTags: ["Comment"],
        }),
        addcomment: builder.mutation<Comment,Comment>({
            query: (newdriver) => ({
                url: "/comments",
                method: "POST",
                body: newdriver,
            }),
            invalidatesTags: ["Comment"],
        }),
    }),
});

export const {
    useGetAllcommentsQuery,
    useAddcommentMutation,
} = apiCommentSlice;
export default apiCommentSlice