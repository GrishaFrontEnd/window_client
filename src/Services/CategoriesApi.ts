import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  CreateCategory,
  ICategory,
  IUpdateCategory,
} from "../Models/ICategory";
import { RootState } from "../Store/Store";

export const CategoriesApi = createApi({
  reducerPath: "CategoriesApi",
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_ADDRESS_DEVELOPMENT}/categories`,
    prepareHeaders: (headers, { getState }) => {
      let token =
        (getState() as RootState).auth.token ||
        window.localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllCategories: builder.query<ICategory[], void>({
      query: () => `/`,
      providesTags: [{ type: "Categories", id: "list" }],
    }),
    fetchCategoryById: builder.query<ICategory, number>({
      query: (id) => `/${id}`,
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<ICategory, CreateCategory>({
      query(body) {
        return {
          url: "",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Categories", id: "list" }],
    }),
    updateCategory: builder.mutation<ICategory, IUpdateCategory>({
      query: (body) => ({
        url: "",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Categories", id: "list" }],
    }),
    deleteCategory: builder.mutation<number, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Categories", id: "list" }],
    }),
  }),
});

export const {
  useFetchAllCategoriesQuery,
  useFetchCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = CategoriesApi;
