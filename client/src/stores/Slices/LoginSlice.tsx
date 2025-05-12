import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Define a type for the user
interface User {
    // id: string;
    userName: string;
    phone: string;
    email: string;
    password: string;
    hasCar: boolean;
    driveringLicense: string;
    gender: string;
 //   createdAt: Date;
}
// Define a type for the initial state
interface LoginState {
    loginUser: User[];
    
}

const initialState: LoginState = {
   
    loginUser: []
};

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        
        addUser: (state, action: PayloadAction<User>) => {
              state.loginUser.push(action.payload);
           
        },
    }
});

export const { addUser } = LoginSlice.actions;
export default LoginSlice.reducer;