import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorView: '',
    language: [],
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.language = action.payload
        },
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchErrorMessage: (state, action) => {
            state.loading = false;
            state.errorView = action.payload;
        },
    }
})

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage } = languageSlice.actions;

export default languageSlice.reducer;