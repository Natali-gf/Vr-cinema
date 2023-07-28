import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorView: '',
    category: [],
    // categoryId: '',
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
            state.error = action.payload.message;
            state.errorView = action.payload;
        },
        // setCategoryId: (state, action) => {
        //     state.categoryId = action.payload
        // },
    }
})

export const { fetching, fetchSuccess, fetchError } = categorySlice.actions
export const categories = (state) => state.category;

export default categorySlice.reducer