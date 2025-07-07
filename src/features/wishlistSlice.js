import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/wishlists`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("token", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserWishlist: builder.query({
      query: (userId) => `/find/${userId}`,
      providesTags: ["Wishlist"],
    }),
    toggleWishlist: builder.mutation({
      query: (wishlistData) => ({
        url: `/toggle/${wishlistData?.userId}`,
        method: "POST",
        body: wishlistData,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    addManyToWishlist: builder.mutation({
      query: (wishlistData) => ({
        url: `/add-many/${wishlistData?.userId}`,
        method: "POST",
        body: wishlistData,
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetUserWishlistQuery,
  useToggleWishlistMutation,
  useAddManyToWishlistMutation
} = wishlistApi;
