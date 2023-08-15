import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingPage: false,
    loadingWindow: false,
    error: '',
    errorView: '',
    films: [],
    filmData: '',
    filmId: '',
}

export const filmSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loadingPage = true
        },
        fetchSuccess: (state, action) => {
            state.loadingPage = false
            state.films = action.payload
        },
        fetchError: (state, action) => {
            state.loadingPage = false;
            state.loadingWindow = false;
            state.error = action.payload;
        },
        fetchErrorMessage: (state, action) => {
            state.loadingPage = false;
            state.loadingWindow = false;
            state.errorView = action.payload;
        },
        fetchingCurrentFilm: (state) => {
            state.loadingWindow = true
        },
        fetchCurrentFilmSuccess: (state, action) => {
            state.loadingWindow = false;
            state.filmData = action.payload
        },
        setFilmId: (state, action) => {
            state.filmId = action.payload
        },
        clearFilmData: (state) => {
            state.filmData = ''
        },
    }
})

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage,
    fetchingCurrentFilm, fetchCurrentFilmSuccess,
    setFilmId, clearFilmData } = filmSlice.actions;

export default filmSlice.reducer