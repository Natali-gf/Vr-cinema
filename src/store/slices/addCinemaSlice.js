import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errorMessage: '',
    addCinemaRes: ''
}

export const addCinemaSlice = createSlice({
    name: 'addCinema',
    initialState,
    reducers: {
        fetchSuccess: (state, action) => {
            state.addCinemaRes = action.payload
        },
        fetchError: (state, action) => {
            state.errorMessage = action.payload;
        }
    }
})

export const { fetchSuccess, fetchError } = addCinemaSlice.actions;

export default addCinemaSlice.reducer