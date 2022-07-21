import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Validation } from "./types";

export const validationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/resources/validation" }),
  reducerPath: "validationApi",
  tagTypes: ["Validation"],
  endpoints: (builder) => ({
    fetchValidationList: builder.query<any, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),
    updateValidations: builder.mutation<any, Validation>({
      query: (validation) => ({
        url: "/update",
        method: "POST",
        body: validation,
      }),
    }),
  }),
});

export const { useFetchValidationListQuery, useUpdateValidationsMutation } =
  validationApi;
