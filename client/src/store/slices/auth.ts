import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

// Define a type for the slice state
interface AuthState {
  user: IUser | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  initialized: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.initialized = true;
    },
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer