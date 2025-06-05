import { User } from "../../components/interfaces/Interface";
import apiSlice from "../Slices/ApiSlice";
interface UserSchema {
    userName: string;
    phone: string;
    email: string;
     password: string;
    hasCar?: boolean|undefined;
    driveringLicense?: string|undefined;
    gender: string;

}

interface SuggestionSchema {
    driver: UserSchema;
    address: string;
    source: string;
    destination: string;
    date: Date;
    time:  string;
    availableSeats:  number;
    genderPreference: string;
passengers: UserSchema[];/////????
    status: string;
  
}

interface LoginCredentials {
    email: string;
    password: string;
}

export interface Response {
    accessToken: string;
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
                url: "/login",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["LoginCredentials"]
        }),
    })
})

export const {useLoginMutation, useRegisterMutation } = UserApiSlice;
export default UserApiSlice;