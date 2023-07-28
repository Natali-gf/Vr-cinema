import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	city: [],
	owner: [],
	typeCinema: [],
	filtered: 'initialState',
	sort: '',
	sorted: 'initialState',
	buttonReset: '',
	filterVisible: false,
	activeFilter: false,
	clearFilter: false,
	ascSort: true,
	activeSort: false,
	clearBtnSort: false,
}

	export const filterCinema = createSlice({
	name: 'filterCinema',
	initialState,
	reducers: {
		selectCity(state, action) {
			state.city = [...action.payload];
		},
		selectOwner(state, action) {
			state.owner = [...action.payload];
		},
		selectTypeCinema(state, action) {
			state.typeCinema = [...action.payload];
		},
		currentFilter: (state, action) => {
			state.filtered = action.payload;
		},
		clearCurrentFilter(state) {
			if (state.filtered !== 'initialState'){
				state.filtered = 'initialState'};
		},
		clearAllFilter(state) {
			state.city = [];
			state.owner = [];
			state.typeCinema = [];
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
		showClearBtnFilter(state, action) {
			state.clearFilter = action.payload;
		},
		setDescSort(state){
			state.ascSort = !state.ascSort
		},
		setActiveSort(state, action){
			state.activeSort = action.payload;
		},
		showClearBtnSort(state, action){
			state.activeFilter = action.payload;
		},
	},
})

export const { selectCity, selectOwner, selectTypeCinema,
	currentFilter, clearCurrentFilter, clearAllFilter,
	selectSort, currentSort, resetAllButton,
	setFilterVisible, setActiveFilter, showClearBtnFilter,
	setDescSort, setActiveSort, showClearBtnSort } = filterCinema.actions

export default filterCinema.reducer