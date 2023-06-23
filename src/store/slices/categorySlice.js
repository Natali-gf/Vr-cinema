import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: '',
    category: []
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetchSuccess: (state, action) => {
            state.category = action.payload
        },
        fetchError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { fetchSuccess, fetchError } = categorySlice.actions
export const categories = (state) => state.category;

export default categorySlice.reducer