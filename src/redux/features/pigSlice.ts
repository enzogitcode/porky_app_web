// src/redux/services/pigsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pig, Paricion } from "../../types/types";

export const pigsApi = createApi({
  reducerPath: "pigsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/pigs" }),
  tagTypes: ["Pigs"], // útil para invalidación automática
  endpoints: (builder) => ({
    // GET all pigs
    getAllPigs: builder.query<Pig[], void>({
      query: () => "/",
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
      providesTags: (result, error, nroCaravana) => [{ type: "Pigs", id: nroCaravana }],
    }),

    // CREATE a pig
    createAPig: builder.mutation<Pig, Partial<Pig>>({
      query: (newPig) => ({
        url: "/",
        method: "POST",
        body: newPig,
      }),
      invalidatesTags: ["Pigs"], // refetch automáticamente
    }),

    // PATCH pig by ID
    updatePigById: builder.mutation<Pig, { id: string; data: Partial<Pig> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Pigs", id }],
    }),

    // DELETE pig by ID
    deletePigById: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Pigs" }],
    }),

    // PATCH agregar parición
addParicion: builder.mutation<Pig, { pigId: string; data: Paricion }>({
  query: ({ pigId, data }) => ({
    url: `/${pigId}/paricion`,
    method: "PATCH",
    body: data,
  }),
  invalidatesTags: (result, error, { pigId }) => [{ type: "Pigs", id: pigId }],
}),


    // PATCH paricion
    patchParicion: builder.mutation<Paricion, { pigId: string; paricionId: string; data: Partial<Paricion> }>({
      query: ({ pigId, paricionId, data }) => ({
        url: `/${pigId}/${paricionId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Pigs"], // refetch pigs si cambió algo
    }),
  }),
});

// Hooks autogenerados
export const {
  useGetAllPigsQuery,
  useGetPigByIdQuery,
  useGetPigByCaravanaQuery,
  useCreateAPigMutation,
  useUpdatePigByIdMutation,
  useDeletePigByIdMutation,
  usePatchParicionMutation,
  useAddParicionMutation
} = pigsApi;
