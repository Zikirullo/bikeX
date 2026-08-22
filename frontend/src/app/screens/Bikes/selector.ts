import { createSelector } from "reselect";
import type { AppRootState } from "../../../lib/types/screen";

const selectBikesPage = (state: AppRootState) => state.bikesPage;

export const retrieveStore = createSelector(
  selectBikesPage,
  (BikesPage) => BikesPage.store,
);

export const retrieveChosenBike = createSelector(
  selectBikesPage,
  (BikesPage) => BikesPage.chosenBike,
);

export const retrieveBikes = createSelector(
  selectBikesPage,
  (BikesPage) => BikesPage.bikes,
);
