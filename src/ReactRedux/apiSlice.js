// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kallesshopserver-production.up.railway.app' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    addItem: builder.mutation({
      query: (newItem) => ({
        url: '/products',
        method: 'POST',
        body: newItem,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),
    updateProductStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({id,data}) => ({
        url: `/products/${id}`,
        method: `PUT`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      })
    })
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
  useAddItemMutation,
  useUpdateProductMutation
} = apiSlice;
