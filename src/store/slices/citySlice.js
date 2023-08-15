import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorView: '',
    city: [],
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.city = action.payload;
        },
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchErrorMessage: (state, action) => {
            state.loading = false;
            state.errorView = action.payload;
        }
    }
})

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage } = citySlice.actions;

export default citySlice.reducer;