import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    franchisee: []
}

export const franchiseeSlice = createSlice({
    name: 'franchisee',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.franchisee = action.payload
        },
        fetchError: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        }
    }
})

export const { fetching, fetchSuccess, fetchError } = franchiseeSlice.actions;
export const allFranchisee = (state) => state.franchisee;

export default franchiseeSlice.reducer