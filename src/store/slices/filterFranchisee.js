import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	typeFranchisee: [],
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

	export const filterFranchisee = createSlice({
	name: 'filterFranchisee',
	initialState,
	reducers: {
		selectTypeFranchisee(state, action) {
			state.typeFranchisee = [...action.payload];
		},
		currentFilter: (state, action) => {
			state.filtered = action.payload;
		},
		clearCurrentFilter(state) {
			if (state.filtered !== 'initialState'){
				state.filtered = 'initialState'};
		},
		clearAllFilter(state) {
			state.typeFranchisee = [];
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
			state.clearBtnSort = action.payload;
		},
	},
})

export const { selectTypeFranchisee,
	currentFilter, clearCurrentFilter, clearAllFilter,
	selectSort, currentSort, resetAllButton,
	setFilterVisible, setActiveFilter, showClearBtnFilter, setDescSort, setActiveSort, showClearBtnSort } = filterFranchisee.actions

export default filterFranchisee.reducer