import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	genre: [],
	studio: [],
	yearFrom: [],
	yearTo: [],
	language: [],
	filtered: 'initialState',
	sort: '',
	sorted: 'initialState',
	buttonReset: '',
	filterVisible: false,
	activeFilter: false,
	clearFilter: false,
}

	export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		selectGenre(state, action) {
			state.genre = [...action.payload];
		},
		selectStudio(state, action) {
			state.studio = [...action.payload];
		},
		selectYearFrom(state, action) {
			state.yearFrom = [{...action.payload}];
		},
		selectYearTo(state, action) {
			state.yearTo = [{...action.payload}];
		},
		selectLang: (state, action) => {
			state.language = [...action.payload];
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
			state.yearFrom = [];
			state.yearTo = [];
			state.language = [];
			state.filtered = 'initialState';
		},
		selectSort: (state, action) => {
			state.sort = action.payload
		},
		currentSort: (state, action) => {
			state.sorted = action.payload;
		},
		resetAllButton(state, action) {
			state.buttonReset = action.payload;
		},
		setFilterVisible(state, action) {
			state.filterVisible = action.payload;
		},
		setActiveFilter(state, action) {
			state.activeFilter = action.payload;
		},
		setClearFilter(state, action) {
			state.clearFilter = action.payload;
		}
	},
})

export const { selectGenre, selectStudio, selectYearFrom, selectYearTo, selectLang,
			currentFilter, clearCurrentFilter, clearAllFilter,
			selectSort, currentSort, resetAllButton,
			setFilterVisible, setActiveFilter, setClearFilter } = filterSlice.actions

export default filterSlice.reducer