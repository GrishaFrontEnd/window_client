import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  user: string;
  token: string;
  isAdmin: boolean;
}

const initialState: IAuthState = {
  user: "",
  token: "",
  isAdmin: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.email;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials } = authSlice.actions;
