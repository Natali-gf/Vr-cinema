import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingPage: false,
    loadingWindow: false,
    error: '',
    errorView: '',
    cinema: [],
    cinemaId: '',
    cinemaData: [],
}

export const cinemaSlice = createSlice({
    name: 'cinema',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loadingPage = true;
        },
        fetchSuccess: (state, action) => {
            state.loadingPage = false;
            state.cinema = action.payload;
        },
        fetchError: (state, action) => {
            state.loadingPage = false;
            state.loadingWindow = false;
            state.error = action.payload.message;
            state.errorView = action.payload;
        },
        fetchingCurrentCinema: (state) => {
            state.loadingWindow = true;
        },
        fetchCurrentCinemaSuccess: (state, action) => {
            state.loadingWindow = false;
            state.cinemaData = action.payload;
        },
        setCinemaId: (state, action) => {
            state.cinemaId = action.payload;
        },
        clearCinemaData: (state) => {
            state.cinemaData = '';
        },
    }
})

export const { fetching, fetchSuccess, fetchError,
    fetchingCurrentCinema, fetchCurrentCinemaSuccess,
    setCinemaId, clearCinemaData } = cinemaSlice.actions;

export default cinemaSlice.reducer