import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errorMessage: '',
    addFilmRes: ''
}

export const addFilmSlice = createSlice({
    name: 'addFilm',
    initialState,
    reducers: {
        fetchSuccess: (state, action) => {
            state.addFilmRes = action.payload
        },
        fetchError: (state, action) => {
            state.errorMessage = action.payload;
        }
    }
})

export const { fetchSuccess, fetchError } = addFilmSlice.actions;

export default addFilmSlice.reducer