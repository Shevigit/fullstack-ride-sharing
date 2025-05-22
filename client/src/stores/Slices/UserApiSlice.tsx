import { User } from "../../components/interfaces/Interface";
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

export interface Response {
    accessToken: String;
    user: {
      userName: string;
    phone: string;
    email: string;
     password: string;
    hasCar?: boolean|undefined;
    driveringLicense?: string|undefined;
    gender: string;

    };
  }
const UserApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        register: builder.mutation<Response,User>({
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
                method: "POST",
                body: user
            }),
            invalidatesTags: ["LoginCredentials"]
        }),
    })
})

export const {useLoginMutation, useRegisterMutation } = UserApiSlice;
export default UserApiSlice;