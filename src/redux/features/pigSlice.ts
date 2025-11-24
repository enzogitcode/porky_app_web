import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pig, Paricion } from "../../types/types";

export const pigsApi = createApi({
  reducerPath: "pigsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/pigs" }),
  tagTypes: ["Pigs"],

  endpoints: (builder) => ({

    // GET all pigs
    getAllPigs: builder.query<Pig[], void>({
      query: () => `/`,
      providesTags: ["Pigs"],
    }),

    // GET pig by ID
    getPigById: builder.query<Pig, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Pigs", id }],
    }),

    // GET pig by nroCaravana
    getPigByCaravana: builder.query<Pig, number>({
      query: (nroCaravana) => `/caravana/${nroCaravana}`,
      providesTags: (result, error, nroCaravana) => [
        { type: "Pigs", id: nroCaravana },
      ],
    }),

    // CREATE a pig
    createAPig: builder.mutation<Pig, Partial<Pig>>({
      query: (newPig) => ({
        url: `/`,
        method: "POST",
        body: newPig,
      }),
      invalidatesTags: ["Pigs"],
    }),

    // UPDATE pig
    updatePigById: builder.mutation<Pig, { id: string; data: Partial<Pig> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Pigs", id }],
    }),

    // DELETE pig
    deletePigById: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pigs"],
    }),

    // ADD PARICIÓN
    addParicion: builder.mutation<Pig, { pigId: string; data: Paricion }>({
      query: ({ pigId, data }) => ({
        url: `/${pigId}/pariciones`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { pigId }) => [{ type: "Pigs", id: pigId }],
    }),

    // UPDATE PARICIÓN
    patchParicion: builder.mutation<
      Pig,
      { pigId: string; paricionId: string; data: Partial<Paricion> }
    >({
      query: ({ pigId, paricionId, data }) => ({
        url: `/${pigId}/pariciones/${paricionId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { pigId }) => [{ type: "Pigs", id: pigId }],
    }),

    // REMOVE PARICIÓN
    deleteParicion: builder.mutation<
      Pig,
      { pigId: string; paricionId: string }
    >({
      query: ({ pigId, paricionId }) => ({
        url: `/${pigId}/pariciones/${paricionId}`,
        method: "DELETE", // porque tu backend usa PATCH para eliminar
      }),
      invalidatesTags: (result, error, { pigId }) => [{ type: "Pigs", id: pigId }],
    }),

  }),
});

export const {
  useGetAllPigsQuery,
  useGetPigByIdQuery,
  useGetPigByCaravanaQuery,
  useCreateAPigMutation,
  useUpdatePigByIdMutation,
  useDeletePigByIdMutation,
  useAddParicionMutation,
  usePatchParicionMutation,
  useDeleteParicionMutation,
} = pigsApi;
