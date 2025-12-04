import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pig, Paricion } from "../../types/types";

export const pigsApi = createApi({
  reducerPath: "pigsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }), // 👈 base limpia
  tagTypes: ["Pigs"],

  endpoints: (builder) => ({
    // GET all pigs como array (compatibilidad)
    getAllPigsArray: builder.query<Pig[], { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `pigs?page=${page}&limit=${limit}`,
      providesTags: ["Pigs"],
      transformResponse: (response: { data: Pig[] }) => response.data,
    }),

    // GET all pigs con objeto paginado (para botones de paginación)
    getAllPigsPaginated: builder.query<
      { data: Pig[]; total: number; page: number; totalPages: number },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => `pigs?page=${page}&limit=${limit}`,
      providesTags: ["Pigs"],
    }),

    // GET pig by ID
    getPigById: builder.query<Pig, string>({
      query: (id) => `pigs/${id}`,
      providesTags: (result, error, id) => [{ type: "Pigs", id }],
    }),

    // GET pig by nroCaravana
    getPigByCaravana: builder.query<Pig, number>({
      query: (nroCaravana) => `pigs/caravana/${nroCaravana}`,
      providesTags: (result, error, nroCaravana) => [
        { type: "Pigs", id: nroCaravana },
      ],
    }),

    // CREATE a pig
    createAPig: builder.mutation<Pig, Partial<Pig>>({
      query: (newPig) => ({
        url: `pigs`,
        method: "POST",
        body: newPig,
      }),
      invalidatesTags: ["Pigs"],
    }),

    // UPDATE pig
    updatePigById: builder.mutation<Pig, { id: string; data: Partial<Pig> }>({
      query: ({ id, data }) => ({
        url: `pigs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Pigs", id }],
    }),

    // DELETE pig
    deletePigById: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `pigs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pigs"],
    }),

    // ADD PARICIÓN
    addParicion: builder.mutation<Pig, { pigId: string; data: Paricion }>({
      query: ({ pigId, data }) => ({
        url: `pigs/${pigId}/pariciones`,
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
        url: `pigs/${pigId}/pariciones/${paricionId}`,
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
        url: `pigs/${pigId}/pariciones/${paricionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { pigId }) => [{ type: "Pigs", id: pigId }],
    }),
  }),
});

export const {
  useGetAllPigsArrayQuery,
  useGetAllPigsPaginatedQuery,
  useGetPigByIdQuery,
  useGetPigByCaravanaQuery,
  useCreateAPigMutation,
  useUpdatePigByIdMutation,
  useDeletePigByIdMutation,
  useAddParicionMutation,
  usePatchParicionMutation,
  useDeleteParicionMutation,
} = pigsApi;
