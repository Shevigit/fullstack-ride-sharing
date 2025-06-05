

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
}

interface UserState {
  user: User | null;
}


const storedUser = localStorage.getItem('currentUser');
const initialState: UserState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload)); 
    },
       loginRegister: (state, action) => {
      state.user = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
logout(state) {
  state.user = null;
  localStorage.removeItem('currentUser');
}
  },
});

// export const { login, logout } = userSlice.actions;
export const { login, logout, loginRegister } = userSlice.actions;
export default userSlice.reducer;



