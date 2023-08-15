import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingPage: false,
    loadingWindow: false,
    error: '',
    errorView: '',
    franchisee: [],
    franchiseeId: '',
    franchiseeData: [],
}

export const franchiseeSlice = createSlice({
    name: 'franchisee',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loadingPage = true;
        },
        fetchSuccess: (state, action) => {
            state.loadingPage = false;
            state.franchisee = action.payload;
        },
        fetchError: (state, action) => {
            state.loadingPage = false;
            state.loadingWindow = false;
            state.error = action.payload;
        },
        fetchErrorMessage: (state, action) => {
            state.loadingPage = false;
            state.loadingWindow = false;
            state.errorView = action.payload;
        },
        fetchingCurrentFranchisee: (state) => {
            state.loadingWindow = true;
        },
        fetchCurrentFranchiseeSuccess: (state, action) => {
            state.loadingWindow = false;
            state.franchiseeData = action.payload;
        },
        setFranchiseeId: (state, action) => {
            state.franchiseeId = action.payload;
        },
        clearFranchiseeData: (state) => {
            state.franchiseeData = '';
        },
    }
})

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage,
    fetchingCurrentFranchisee, fetchCurrentFranchiseeSuccess,
    setFranchiseeId, clearFranchiseeData  } = franchiseeSlice.actions;

export default franchiseeSlice.reducer