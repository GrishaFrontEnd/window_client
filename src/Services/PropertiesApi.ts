import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  ICreateProperty,
  IProperty,
  IPropsCategory,
  IUpdateProperty,
} from "../Models/IProperty";
import { RootState } from "../Store/Store";

export const PropertiesApi = createApi({
  reducerPath: "PropertiesApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Properties"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_ADDRESS_DEVELOPMENT}/properties`,
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
    fetchAllProperties: builder.query<IProperty[], void>({
      query: () => ({
        url: "",
      }),
      providesTags: [{ type: "Properties", id: "list" }],
    }),
    fetchPropertiesByCategory: builder.query<IPropsCategory[], number>({
      query: (category_id) => ({
        url: `?category_id=${category_id}`,
      }),
      providesTags: ["Properties"],
    }),
    fetchPropertyById: builder.query<IProperty, number>({
      query: (id) => ({
        url: `${id}`,
      }),
      providesTags: ["Properties"],
    }),
    createProperty: builder.mutation<IProperty, ICreateProperty>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Properties", id: "list" }],
    }),
    updateProperty: builder.mutation<IProperty, IUpdateProperty>({
      query: (patch) => ({
        url: ``,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: [{ type: "Properties", id: "list" }],
    }),
    deleteProperty: builder.mutation<number, number>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Properties", id: "list" }],
    }),
  }),
});

export const {
  useFetchAllPropertiesQuery,
  useFetchPropertiesByCategoryQuery,
  useLazyFetchPropertiesByCategoryQuery,
  useFetchPropertyByIdQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = PropertiesApi;
