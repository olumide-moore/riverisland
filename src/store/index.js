import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware),
});
