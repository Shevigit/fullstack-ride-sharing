import apiSlice from "../Slices/ApiSlice"
interface SuggestionSchema {
    driver: UserSchema;
    address: String;
    source: String;
    destination: String;
    date: Date;
    time:  String;
    availableSeats:  Number;
    genderPreference: String;
    passengers: UserSchema
    status: String;
  //  createdAt:Date;
}


interface UserSchema {
    userName: string;
    phone: string;
    email: string;
     password: string;
    hasCar?: boolean|undefined;
    driveringLicense?: string|undefined;
    gender: string;

}


interface LoginCredentials {
    email: string;
    password: string;
}
interface Response {
    success: boolean;
    message: string;
  
}

const UserApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        register: builder.mutation<Response,UserSchema>({
            query: (user) => ({
                url: "/register",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        login: builder.mutation<Response,LoginCredentials>({
            query: (user) => ({
                url: `/login`,
                method: "PUT",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        // Uncomment and complete the following if needed
        // updateRecipe: builder.mutation<any, { _id: string, recipe: any }>({
        //     query: (recipe) => ({
        //         url: `/recipes/${recipe._id}`,
        //         method: "PUT",
        //         body: recipe
        //     }),
        //     invalidatesTags: ["User"]
        // }),
        // deleteRecipe: builder.mutation<any, string>({
        //     query: (id) => ({
        //         url: `/recipes/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["User"]
        // })
    })
})

export const {useLoginMutation, useRegisterMutation } = UserApiSlice;
export default UserApiSlice;