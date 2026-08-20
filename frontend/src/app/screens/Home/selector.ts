import { createSelector } from "reselect";
import type { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveCategory = createSelector(
  selectHomePage,
  (HomePage) => HomePage.category,
);

export const retrievePopularBikes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularBikes,
);
