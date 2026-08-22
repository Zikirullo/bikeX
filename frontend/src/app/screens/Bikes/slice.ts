import { createSlice } from "@reduxjs/toolkit";
import type { BikesPageState } from "../../../lib/types/screen";

const initialState: BikesPageState = {
  store: null,
  chosenBike: null,
  bikes: [],
};

const bikesPageSlice = createSlice({
  name: "bikesPage",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
    setChosenBike: (state, action) => {
      state.chosenBike = action.payload;
    },
    setCBikes: (state, action) => {
      state.bikes = action.payload;
    },
  },
});

export const { setStore, setChosenBike, setCBikes } = bikesPageSlice.actions;

const BikesPageReducer = bikesPageSlice.reducer;

export default BikesPageReducer;
