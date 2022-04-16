import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", id: "" };
export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    loginUser: (state, action) => {
      state.value = action?.payload.userDeatils;
      localStorage.setItem("token", JSON.stringify(action?.payload));
    },
    logout: (state) => {
      state.value = initialState;
      localStorage.clear();
    },
  },
});

export const { loginUser, logout } = userSlice.actions;
export default userSlice.reducer;
