import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filmReducer from './slices/filmSlice';
import filter from "./slices/filterFilm";
import filterCinema from "./slices/filterCinema";
import category from "./slices/categorySlice";
import copyright from "./slices/copyrightSlice";
import stateAddWindow from "./slices/windowStateSlice";
import search from "./slices/searchSlice";
import cinema from "./slices/cinemaSlice";
import form from "./slices/formSlice";
import franchisee from "./slices/franchiseeSlice";
import addFranchisee from "./slices/addFranchiseeSlice";
import addCinema from "./slices/addCinemaSlice";
import addFilm from "./slices/addFilmSlice";

const rootReducer = combineReducers({
  films: filmReducer,
  filter,
  filterCinema,
  category,
  copyright,
  stateAddWindow,
  search,
  cinema,
  franchisee,
  form,
  addFranchisee,
  addCinema,
  addFilm,
})

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  })
}





