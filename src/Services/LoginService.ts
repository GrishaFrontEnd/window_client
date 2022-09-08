import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../Store/Store";

interface UserResponse {
  token: string;
  isAdmin: boolean;
  email: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const AuthApi = createApi({
  reducerPath: "authApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_ADDRESS_DEVELOPMENT}/auth`,
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.token ||
        window.localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    registration: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/registration",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    me: builder.query<UserResponse, string>({
      query: () => ({
        url: "/me",
      }),
      providesTags: [{ type: "Auth", id: "LIST" }],
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useMeQuery } =
  AuthApi;
