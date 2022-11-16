import { configureStore } from "@reduxjs/toolkit";
import common from "./constant/common";

export const store = configureStore({
  reducer: {
    common: common,
  },
});
