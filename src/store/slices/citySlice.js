import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    // loadingCurrent: false,
    error: '',
    errorView: '',
    city: [],
    // cityId: '',
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.city = action.payload;
        },
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.errorView = action.payload;
        },
        // fetchingCurrentCity: (state) => {
        //     state.loadingCurrent = true
        // },
        // fetchCurrentCitySuccess: (state, action) => {
        //     state.loadingCurrent = false;
        //     state.city = action.payload
        // },
        // setCityId: (state, action) => {
        //     state.cityId = action.payload
        // },
    }
})

export const { fetching, fetchSuccess, fetchError,
    // fetchingCurrentCity, fetchCurrentCitySuccess, setCityId
} = citySlice.actions;

export default citySlice.reducer;