
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: string | number;
  name?: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  hasCar?: boolean;
  driveringLicense?: string;
}

interface AuthState {
  currentUser: User | null;
}

const initialState: AuthState = {
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
