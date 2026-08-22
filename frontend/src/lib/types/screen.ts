import type { Bike } from "./bike";
import type { User } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  bikesPage: BikesPageState;
}

export interface HomePageState {
  popularBikes: Bike[];
}

export interface BikesPageState {
  store: User | null;
  chosenBike: Bike | null;
  bikes: Bike[];
}
