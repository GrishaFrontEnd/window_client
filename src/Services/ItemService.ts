import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IServerItem, ServerItem, ServerResponse } from "../Models/IItem";
import { RootState } from "../Store/Store";

export const ItemAPI = createApi({
  reducerPath: "ItemAPI",
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_ADDRESS_DEVELOPMENT}/items`,
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
  tagTypes: ["Items"],
  endpoints: (build) => ({
    fetchAllItems: build.query<ServerResponse, String>({
      query: (str) => ({
        url: `${str}`,
      }),
      providesTags: ["Items"],
    }),
    fetchItemById: build.query<IServerItem, number>({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Items"],
    }),
    fetchAllItemsByCategories: build.query<ServerResponse, string>({
      query: (category) => ({
        url: `${category}`,
      }),
      providesTags: ["Items"],
    }),
    createItem: build.mutation<ServerItem, FormData>({
      query: (dto) => ({
        url: "",
        method: "POST",
        body: dto,
      }),
      invalidatesTags: [{ type: "Items", id: "1" }],
    }),
    setItemImage: build.mutation<ServerItem, FormData>({
      query: (formData) => ({
        url: ``,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [{ type: "Items", id: "1" }],
    }),
    updateDataItem: build.mutation<ServerItem, FormData>({
      query: (formData) => ({
        url: ``,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [{ type: "Items", id: "list" }],
    }),
    deleteItem: build.mutation<number, Number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Items", id: "list" }],
    }),
  }),
});

export const {
  useFetchAllItemsQuery,
  useFetchItemByIdQuery,
  useFetchAllItemsByCategoriesQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useSetItemImageMutation,
  useUpdateDataItemMutation,
} = ItemAPI;
