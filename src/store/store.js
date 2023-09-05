import { configureStore, combineReducers } from "@reduxjs/toolkit";
import films from './slices/filmSlice';
import filter from "./slices/filterFilm";
import filterCinema from "./slices/filterCinema";
import filterFranchisee from "./slices/filterFranchisee";
import category from "./slices/categorySlice";
import copyright from "./slices/copyrightSlice";
import statePopupWindow from "./slices/windowStateSlice";
import search from "./slices/searchSlice";
import cinema from "./slices/cinemaSlice";
import franchisee from "./slices/franchiseeSlice";
import language from "./slices/languageSlice";
import typeCinema from "./slices/typeCinemaSlice";
import city from "./slices/citySlice";
import notification from "./slices/notification";
import user from "./slices/userSlice";

const rootReducer = combineReducers({
  films,
  filter,
  filterCinema,
  filterFranchisee,
  category,
  copyright,
  language,
  typeCinema,
  city,
  statePopupWindow,
  search,
  cinema,
  franchisee,
  notification,
  user
})

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  })
}





