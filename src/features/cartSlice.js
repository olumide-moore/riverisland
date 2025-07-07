import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/carts`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("token", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: (userId) => `/find/${userId}`,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: `/add`,
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),
    addManyToCart: builder.mutation({
      query: (cartData) => ({
        url: `/add-many`,
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),
    decreaseFromCart: builder.mutation({
      query: (cartData) => ({
        url: `/decrease`,
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: builder.mutation({
      query: (cartData) => ({
        url: `/delete-product`,
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useAddManyToCartMutation,
  useDecreaseFromCartMutation,
  useDeleteCartItemMutation,
} = cartApi;
