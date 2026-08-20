import type { Bike } from "./bike";
import type { User } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  bikesPage: BikesPageState;
}

export interface HomePageState {
  category: Bike[];
  popularBikes: Bike[];
}

export interface BikesPageState {
  store: User | null;
  chosenBike: Bike | null;
  bikes: Bike[];
}
