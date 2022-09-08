import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IService } from "../Models/IService";
import { RootState } from "../Store/Store";

export const ServiceApi = createApi({
  reducerPath: "serivce_api",
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  tagTypes: ["Servcice"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_ADDRESS_DEVELOPMENT}/services`,
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
    fetchAllServices: builder.query<IService[], void>({
      query: () => ({
        url: ``,
      }),
      providesTags: [{ type: "Servcice", id: "List" }],
    }),
    fetchOneServiceById: builder.query<IService, number>({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Servcice"],
    }),
    createService: builder.mutation<IService, FormData>({
      query(body) {
        return {
          url: "",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Servcice", id: "List" }],
    }),
    updateService: builder.mutation<IService, FormData>({
      query: (body) => ({
        url: "",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Servcice", id: "List" }],
    }),
    deleteService: builder.mutation<number, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Servcice", id: "List" }],
    }),
  }),
});

export const {
  useFetchAllServicesQuery,
  useFetchOneServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = ServiceApi;
