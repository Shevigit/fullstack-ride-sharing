

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
}

interface UserState {
  user: User | null;
}

// נשלוף מה-localStorage אם קיים
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
      localStorage.setItem('currentUser', JSON.stringify(action.payload)); // שמירה גם ב-localStorage
    },
logout(state) {
  state.user = null;
  localStorage.removeItem('currentUser');
}
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;