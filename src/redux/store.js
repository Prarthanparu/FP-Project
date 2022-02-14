import { configureStore, compose } from "@reduxjs/toolkit";
import datasourceReducer from "./slices/dataSourceSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore(
  {
    reducer: {
      datasource: datasourceReducer,
    },
  },
  composeEnhancers()
);
