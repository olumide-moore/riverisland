import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "../features/cartSlice";
import { wishlistApi } from "../features/wishlistSlice";
import { productApi } from "../features/productSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, cartApi.middleware, wishlistApi.middleware),
});
