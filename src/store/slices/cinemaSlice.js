import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingPage: false,
    loadingWindow: false,
    error: '',
    errorView: '',
    cinema: [],
    cinemaId: '',
    cinemaFranchiseeId: '',
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
            state.error = action.payload;
        },
        fetchErrorMessage: (state, action) => {
            state.loadingPage = false;
            state.loadingWindow = false;
            state.errorView = action.payload;
        },
        fetchingCurrentCinema: (state) => {
            state.loadingWindow = true;
        },
        fetchCurrentCinemaSuccess: (state, action) => {
            state.loadingWindow = false;
            state.cinemaData = action.payload;
            state.cinemaData.franchisee = action.payload.franchisee.name;
        },
        setCinemaId: (state, action) => {
            state.cinemaId = action.payload.id;
            state.cinemaFranchiseeId = action.payload.franchisee.id;
        },
        clearCinemaData: (state) => {
            state.cinemaData = '';
        },
    }
})

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage,
    fetchingCurrentCinema, fetchCurrentCinemaSuccess,
    setCinemaId, clearCinemaData } = cinemaSlice.actions;

export default cinemaSlice.reducer