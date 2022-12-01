import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update: false,
  user: {},
  state: undefined,
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
    setState: (state, { payload }) => {
      state.state = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUpdate, setUser, setState } = common.actions;

export default common.reducer;
