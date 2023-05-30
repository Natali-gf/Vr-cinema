import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	genre: [],
	studio: [],
	yearFrom: '',
	yearTo: '',
	language: '',
	filtered: 'initialState',
	sort: '',
	sorted: 'initialState',
	buttonReset: ''
}

	export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		selectGenre(state, action) {
			state.genre = [...action.payload];
		},
		clearGenre(state) {
			state.genre = [];
		},
		selectStudio(state, action) {
			state.studio = [...action.payload];
		},
		clearStudio(state) {
			state.studio = [];
		},
		selectYearFrom(state, action) {
			state.yearFrom = action.payload;
		},
		clearYearFrom(state) {
			state.yearFrom = '';
		},
		selectYearTo(state, action) {
			state.yearTo = action.payload;
		},
		clearYearTo(state) {
			state.yearTo = '';
		},
		selectLang: (state, action) => {
			state.language = [...action.payload];
		},
		clearLang: (state) => {
			state.language = [];
		},
		currentFilter: (state, action) => {
			state.filtered = action.payload;
		},
		clearCurrentFilter(state) {
			if (state.filtered !== 'initialState'){
				state.filtered = 'initialState'};
		},
		clearAllFilter(state) {
			state.genre = [];
			state.studio = [];
			state.yearFrom = '';
			state.yearTo = '';
			state.language = [];
			state.filtered = 'initialState';
		},
		selectSort: (state, action) => {
			state.sort = action.payload
		},
		currentSort: (state, action) => {
			state.sorted = action.payload;
		},
		resetAll(state, action) {
			state.buttonReset = action.payload;
		}
	},
})

export const {
			selectGenre,  clearGenre,
			selectStudio, clearStudio,
			selectYearFrom, clearYearFrom,
			selectYearTo, clearYearTo,
			selectLang, clearLang, resetAll,
			currentFilter, clearCurrentFilter, clearAllFilter,
			selectSort, currentSort } = filterSlice.actions

export default filterSlice.reducer