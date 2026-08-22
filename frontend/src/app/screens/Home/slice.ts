import { createSlice } from "@reduxjs/toolkit";
import type { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularBikes: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularBikes: (state, action) => {
      state.popularBikes = action.payload;
    },
  },
});

export const { setPopularBikes } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
