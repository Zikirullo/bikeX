import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BasketItem } from "../../../lib/types/basket";
import type { BasketState } from "../../../lib/types/screen";

const STORAGE_KEY = "basketdata";

// Read synchronously during slice init — not in a useEffect — so there's
// no first-render window where the basket looks empty (same class of bug
// we fixed for auth: don't let a later effect be the only source of truth).
const loadBasket = (): BasketItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.log("ERROR parsing stored basketdata", err);
    return [];
  }
};

const persistBasket = (items: BasketItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.log("ERROR saving basketdata", err);
  }
};

// Hard rule: never more than 3 of the same bike, and never more than
// what's actually in stock.
const maxAllowedFor = (bikeLeftCount: number) => Math.min(3, bikeLeftCount);

const initialState: BasketState = {
  items: loadBasket(),
};

const basketSlice = createSlice({
  name: "basket",
  initialState,

  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      const incoming = action.payload;
      const max = maxAllowedFor(incoming.bikeLeftCount);
      const existing = state.items.find((i) => i.bikeId === incoming.bikeId);

      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + incoming.quantity,
          max,
        );
      } else {
        state.items.push({
          ...incoming,
          quantity: Math.min(incoming.quantity, max),
        });
      }
      persistBasket(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ bikeId: string; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.bikeId === action.payload.bikeId);
      if (item) {
        const max = maxAllowedFor(item.bikeLeftCount);
        item.quantity = Math.max(1, Math.min(action.payload.quantity, max));
      }
      persistBasket(state.items);
    },

    removeItem: (state, action: PayloadAction<{ bikeId: string }>) => {
      state.items = state.items.filter(
        (i) => i.bikeId !== action.payload.bikeId,
      );
      persistBasket(state.items);
    },

    clearBasket: (state) => {
      state.items = [];
      persistBasket(state.items);
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearBasket } =
  basketSlice.actions;

const BasketReducer = basketSlice.reducer;

export default BasketReducer;
