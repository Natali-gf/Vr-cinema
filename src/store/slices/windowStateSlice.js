import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	filmAddWindow: false,
	cinemaAddWindow: false,
	franchiseeAddWindow: false,
	filmEditWindow: false,
	cinemaEditWindow: false,
	franchiseeEditWindow: false,
	filmInfoWindow: false,
	cinemaInfoWindow: false,
	franchiseeInfoWindow: false,
}

	export const statePopupWindow = createSlice({
	name: 'statePopupWindow',
	initialState,
	reducers: {
		showFilmAdd(state, action) {
			state.filmAddWindow = action.payload;
		},
		showCinemaAdd(state, action) {
			state.cinemaAddWindow = action.payload;
		},
		showFranchiseeAdd(state, action) {
			state.franchiseeAddWindow = action.payload;
		},
		showFilmEdit(state, action) {
			state.filmEditWindow = action.payload;
		},
		showCinemaEdit(state, action) {
			state.cinemaEditWindow = action.payload;
		},
		showFranchiseeEdit(state, action) {
			state.franchiseeEditWindow = action.payload;
		},
		showFilmInfo(state, action) {
			state.filmInfoWindow = action.payload;
		},
		showCinemaInfo(state, action) {
			state.cinemaInfoWindow = action.payload;
		},
		showFranchiseeInfo(state, action) {
			state.franchiseeInfoWindow = action.payload;
		},
	},
})

export const { showFilmAdd, showCinemaAdd, showFranchiseeAdd,
	showFilmEdit, showCinemaEdit, showFranchiseeEdit,
	showFilmInfo, showCinemaInfo, showFranchiseeInfo } = statePopupWindow.actions

export default statePopupWindow.reducer