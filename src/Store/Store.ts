import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { ItemAPI } from "../Services/ItemService";
import itemReducer from "./Slices/ItemSlice";
import authReducer from "./Slices/AuthSlice";
import { AuthApi } from "../Services/LoginService";
import { CategoriesApi } from "../Services/CategoriesApi";
import { ServiceApi } from "../Services/ServiceApi";
import categoryReducer from "./Slices/CategoriesSlice";
import serviceReducer from "./Slices/ServiceSlice";
import { PropertiesApi } from "../Services/PropertiesApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import createItemReducer from "./Slices/CreateItemSlice";

const rootReducer = combineReducers({
  itemReducer,
  [ItemAPI.reducerPath]: ItemAPI.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [CategoriesApi.reducerPath]: CategoriesApi.reducer,
  [ServiceApi.reducerPath]: ServiceApi.reducer,
  auth: authReducer,
  categories: categoryReducer,
  service: serviceReducer,
  [PropertiesApi.reducerPath]: PropertiesApi.reducer,
  createItem: createItemReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        ItemAPI.middleware,
        AuthApi.middleware,
        CategoriesApi.middleware,
        ServiceApi.middleware,
        PropertiesApi.middleware,
      ]),
  });
};

setupListeners(setupStore().dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
