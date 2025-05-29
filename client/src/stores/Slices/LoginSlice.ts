import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterUser, User } from "../../components/interfaces/Interface";

interface loginUser {
  user:RegisterUser
}

const initialState:loginUser = {
     user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")as string):null
};

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
         addUser: (state, action: PayloadAction<RegisterUser>) => {
             state.user=action.payload
        },


    }
});

export const { addUser } = LoginSlice.actions;
export const selectUser = (state: { login: loginUser }):User => {state.login.user};

export default LoginSlice.reducer;
