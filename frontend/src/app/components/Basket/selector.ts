import type { AppRootState } from "../../../lib/types/screen";

export const selectBasket = (state: AppRootState) => state.basket;

export const selectBasketItems = (state: AppRootState) => state.basket.items;

export const selectBasketCount = (state: AppRootState) =>
  state.basket.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectBasketTotal = (state: AppRootState) =>
  state.basket.items.reduce(
    (sum, item) => sum + item.quantity * item.bikePrice,
    0,
  );
