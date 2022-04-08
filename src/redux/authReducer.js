import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    isAuthorize: false,
    user: {},
  },
  reducers: {
    setLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthorize = true;
      state.user = action.payload.user;
    },
    setLogout: (state, _) => {
      state.accessToken = "";
      state.isAuthorize = false;
      state.user = {};
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
