import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filmReducer from './slices/filmSlice';
import filter from "./slices/filterSlice";

const rootReducer = combineReducers({
    films: filmReducer,
    filter,
})

export function setupStore() {
    return configureStore({
      reducer: rootReducer,
    })
  }





