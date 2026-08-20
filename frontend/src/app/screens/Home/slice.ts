import { createSlice } from "@reduxjs/toolkit";
import type { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  category: [],
  popularBikes: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPopularBikes: (state, action) => {
      state.popularBikes = action.payload;
    },
  },
});

export const { setCategory, setPopularBikes } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
