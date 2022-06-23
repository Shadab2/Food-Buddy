import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  displayName: "",
  email: "",
  photoURL: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "User",
  initialState: INITIAL_STATE,
  reducers: {
    setUserLoginCredentials: (state, action) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.isLoggedIn = true;
    },
    setSignOut: (state) => {
      state.displayName = "";
      state.email = "";
      state.photoURL = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUserLoginCredentials, setSignOut } = userSlice.actions;
//full stores state is passed in
export default userSlice.reducer;
