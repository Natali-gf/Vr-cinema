import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: '',
    errorView: '',
    userId: '',
    userPhoto: '',
    userName: '',
    userRole: 'Администратор',
    // userToken: localStorage.getItem('authorizationToken'),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchSuccess: (state, action) => {
            state.userId = action.payload.id;
            state.userName = action.payload.name ? action.payload.name : action.payload.username;
            state.userPhoto = action.payload.photo;
        },
        fetchError: (state, action) => {
            state.error = action.payload.photo;
        },
        fetchErrorMessage: (state, action) => {
            state.errorView = action.payload;
        }
    }
})

export const { fetchSuccess, fetchError, fetchErrorMessage } = userSlice.actions;

export default userSlice.reducer;