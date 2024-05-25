import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import { apiSlice } from "./Api/apiSlice";
import userSlice from "./user/userSlice";

const rootReducer = combineReducers({
  categories: categoriesSlice,
  products: productsSlice,
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer 
});

export const setupStore = () => {
  return configureStore({
    reducer:  rootReducer,
    middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
