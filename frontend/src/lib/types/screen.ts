import type { Bike } from "./bike";
import type { User } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  bikesPage: BikesPageState;
  auth: AuthState;
}

export interface HomePageState {
  popularBikes: Bike[];
}

export interface BikesPageState {
  store: User | null;

  chosenBike: Bike | null;
  bikes: Bike[];
}

export interface AuthState {
  user: User | null;
  initialized: boolean;
}
