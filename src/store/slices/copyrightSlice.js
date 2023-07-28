import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorView: '',
    copyright: [],
    copyrightId: '',
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
            state.errorView = action.payload;
        },
        // setCopyrightId: (state, action) => {
        //     state.copyrightId = action.payload;
        // },
    }
})

export const { fetching, fetchSuccess, fetchError, setCopyrightId } = copyrightSlice.actions
export const studios = (state) => state.copyright;

export default copyrightSlice.reducer