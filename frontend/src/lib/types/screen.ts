import type { BasketItem } from "./basket";
import type { Bike } from "./bike";
import type { User } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  bikesPage: BikesPageState;
  auth: AuthState;
  basket: BasketState;
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

export interface BasketState {
  items: BasketItem[];
}
