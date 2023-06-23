import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    cinema: []
}

export const cinemaSlice = createSlice({
    name: 'cinema',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.cinema = action.payload
        },
        fetchError: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        }
    }
})

export const { fetching, fetchSuccess, fetchError } = cinemaSlice.actions;

export default cinemaSlice.reducer