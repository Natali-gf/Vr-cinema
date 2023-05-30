import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    films: []
}

export const filmSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.films = action.payload
        },
        fetchError: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        }
    }
})

    export const { fetching, fetchSuccess, fetchError } = filmSlice.actions
    export const selectAllFilms = (state) => state.films;

    export default filmSlice.reducer