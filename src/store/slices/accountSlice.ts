

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";
import { Profile } from "../../interface/auth.interface";

interface accountState {
  token: string,
    info: Profile | null,
}

const initialState: accountState = {
    token: storage.getToken() || "",
    info: JSON.parse(localStorage.getItem("info") || "{}") as Profile,
  }

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string }>) {
      const token = action.payload.token;
      state.token = token;
    },
    setProfileAuth(state, action:PayloadAction<{info: Profile }>) {
      const info = action.payload.info;
      state.info = info;
    },
    logout(state) {
      state.token = "";
      state.info = null;
    },
    setInfoLogin(
      state,
      action: PayloadAction<{ token: string; info: Profile }>
    ) {
      const { token, info } = action.payload;
      state.token = token;
      state.info = info;
      storage.setInfo(state.info)
    },
  },
});

const { actions, reducer } = accountSlice;

export const { logout,setInfoLogin, setProfileAuth,setToken } = actions;

export default reducer;
