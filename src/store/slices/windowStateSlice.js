import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	addFilmWindow: false,
	addCinemaWindow: false,
	addFranchiseeWindow: false,
}

	export const stateAddWindow = createSlice({
	name: 'stateAddWindow',
	initialState,
	reducers: {
		showAddFilm(state, action) {
			state.addFilmWindow = action.payload;
		},
		showAddCinema(state, action) {
			state.addCinemaWindow = action.payload;
		},
		showAddFranchisee(state, action) {
			state.addFranchiseeWindow = action.payload;
		},
	},
})

export const { showAddFilm, showAddCinema, showAddFranchisee } = stateAddWindow.actions

export default stateAddWindow.reducer