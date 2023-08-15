import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
    getAllCategories: builder.query({
      query: () => "products/categories",
    }),
    getProduct: builder.query({
      query: (product) => `products/${product}`,
    }),
  }),
});

export const { useGetAllProductsQuery , useGetAllCategoriesQuery, useGetProductQuery } = productsApi;