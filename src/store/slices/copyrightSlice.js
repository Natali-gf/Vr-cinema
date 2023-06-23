import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: '',
    copyright: []
}

export const copyrightSlice = createSlice({
    name: 'copyright',
    initialState,
    reducers: {
        fetchSuccess: (state, action) => {
            state.copyright = action.payload
        },
        fetchError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { fetchSuccess, fetchError } = copyrightSlice.actions
export const studios = (state) => state.copyright;

export default copyrightSlice.reducer