import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    typeCinema: [],
    errorView: '',
}

export const typeCinemaSlice = createSlice({
    name: 'typeCinema',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.typeCinema = action.payload
        },
        fetchError: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
        fetchErrorMessage: (state, action) => {
            state.loading = false;
            state.errorView = action.payload;
        },
    }
})

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage } = typeCinemaSlice.actions;

export default typeCinemaSlice.reducer;