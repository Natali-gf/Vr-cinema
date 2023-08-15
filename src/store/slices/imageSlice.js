import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorView: '',
    imageLink: '',
    imageId: ''
}

export const typeCinemaSlice = createSlice({
    name: 'typeCinema',
    initialState,
    reducers: {
        fetchError: (state, action) => {
            state.error = action.payload;
        },
        fetchErrorMessage: (state, action) => {
            state.errorView = action.payload;
        }
    }
})

export const { fetchError, fetchErrorMessage } = typeCinemaSlice.actions;

export default typeCinemaSlice.reducer;