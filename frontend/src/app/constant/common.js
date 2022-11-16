import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update: false,
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUpdate: (state) => {
      state.update = !state.update;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUpdate } = common.actions;

export default common.reducer;
