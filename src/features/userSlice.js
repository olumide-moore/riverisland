
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const userApi = createApi({
//   reducerPath: "userApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${API_URL}/api/users`,
//     prepareHeaders: (headers, { getState }) => {
//       const token = localStorage.getItem("accessToken");
//       if (token) {
//         headers.set("token", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getUserUser: builder.query({
//       query: (userId) => `/find/${userId}`,
//       providesTags: ["User"],
//     }),
//     addToUser: builder.mutation({
//       query: (userData) => ({
//         url: `/add`,
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["User"],
//     }),
//     addManyToUser: builder.mutation({
//       query: (userData) => ({
//         url: `/add-many`,
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["User"],
//     }),
//     decreaseFromUser: builder.mutation({
//       query: (userData) => ({
//         url: `/decrease`,
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["User"],
//     }),
//     deleteUserItem: builder.mutation({
//       query: (userData) => ({
//         url: `/delete-product`,
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["User"],
//     }),
//   }),
// });

// export const {
//   useGetUserUserQuery,
//   useAddToUserMutation,
//   useAddManyToUserMutation,
//   useDecreaseFromUserMutation,
//   useDeleteUserItemMutation,
// } = userApi;
