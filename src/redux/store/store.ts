import { configureStore } from "@reduxjs/toolkit";
import { darkModeSlice } from "../features/darkModeSlice";
import { pigsApi } from "../features/pigSlice";
import { vacunasApi } from "../features/vacunaSlice";
export const store = configureStore({
  reducer: {
    darkMode:darkModeSlice.reducer,
    [pigsApi.reducerPath]:pigsApi.reducer,
    [vacunasApi.reducerPath]:vacunasApi.reducer

    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pigsApi.middleware, vacunasApi.middleware),
  
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch