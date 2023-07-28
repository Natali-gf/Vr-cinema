import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    // loadingCurrent: false,
    error: '',
    typeCinema: [],
    errorView: '',
    // typeCinemaId: '',
}

export const typeCinemaSlice = createSlice({
    name: 'typeCinema',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.typeCinema = action.payload
        },
        fetchError: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
            state.errorView = action.payload;
        },
        // fetchingCurrentTypeCinema: (state) => {
        //     state.loadingCurrent = true
        // },
        // fetchCurrentTypeCinemaSuccess: (state, action) => {
        //     state.loadingCurrent = false;
        //     state.typeCinema = action.payload
        // },
        // setTypeCinemaId: (state, action) => {
        //     state.typeCinemaId = action.payload
        // },
    }
})

export const { fetching, fetchSuccess, fetchError,
    fetchingCurrentTypeCinema, fetchCurrentTypeCinemaSuccess, setTypeCinemaId
} = typeCinemaSlice.actions;

export default typeCinemaSlice.reducer;