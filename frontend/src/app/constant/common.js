import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update: false,
  user: {},
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUpdate: (state) => {
      state.update = !state.update;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUpdate, setUser } = common.actions;

export default common.reducer;
