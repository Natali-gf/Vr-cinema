import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    // loadingCurrent: false,
    error: '',
    errorView: '',
    language: [],
    // languageId: '',
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.language = action.payload
        },
        fetchError: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
            state.errorView = action.payload;
        },
        // fetchingCurrentLanguage: (state) => {
        //     state.loadingCurrent = true
        // },
        // fetchCurrentLanguageSuccess: (state, action) => {
        //     state.loadingCurrent = false;
        //     state.language = action.payload
        // },
        // setLanguageId: (state, action) => {
        //     state.languageId = action.payload
        // },
    }
})

export const { fetching, fetchSuccess, fetchError,
    // fetchingCurrentLanguage, fetchCurrentLanguageSuccess, setLanguageId
} = languageSlice.actions;

export default languageSlice.reducer;