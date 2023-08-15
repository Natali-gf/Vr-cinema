import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorView: '',
    copyright: [],
}

export const copyrightSlice = createSlice({
    name: 'copyright',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.copyright = action.payload;
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

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage, setCopyrightId } = copyrightSlice.actions;

export default copyrightSlice.reducer