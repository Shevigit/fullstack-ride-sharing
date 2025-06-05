// Slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  // הוסף שדות נוספים במידת הצורך
}

interface AuthState {
  currentUser: User | null;
}

const initialState: AuthState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
      loginRegister: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { login, loginRegister, logout } = authSlice.actions;
export default authSlice.reducer;
