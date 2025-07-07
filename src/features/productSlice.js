import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/products`,
  }),
  endpoints: (builder) => ({
    getCategoryProducts: builder.query({
      query: (categoryid) => `?category=${categoryid}`,
    }),
    getAProduct: builder.query({
      query: (id) => `/find/${id}`,
    }),
    getProducts: builder.mutation({
      query: (ids) => ({
        url: `/find-many`,
        method: "POST",
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetCategoryProductsQuery,
  useGetAProductQuery,
  useGetProductsMutation,
} = productApi;
