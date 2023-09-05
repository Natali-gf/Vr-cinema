import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorView: '',
    category: [],
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.category = action.payload;
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

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage } = categorySlice.actions
export const categories = (state) => state.category;

export default categorySlice.reducer