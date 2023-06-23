import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errorMessage: '',
    addFranchiseeRes: ''
}

export const addFranchiseeSlice = createSlice({
    name: 'addFranchisee',
    initialState,
    reducers: {
        fetchSuccess: (state, action) => {
            state.addFranchiseeRes = action.payload
        },
        fetchError: (state, action) => {
            state.errorMessage = action.payload;
        }
    }
})

export const { fetching, fetchSuccess, fetchError } = addFranchiseeSlice.actions;

export default addFranchiseeSlice.reducer