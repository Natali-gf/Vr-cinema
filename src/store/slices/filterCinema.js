import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	filterVisible: false,
}

	export const filterCinema = createSlice({
	name: 'filterCinema',
	initialState,
	reducers: {
		setFilterVisible(state, action) {
			state.filterVisible = action.payload;
		}
	},
})

export const { setFilterVisible } = filterCinema.actions

export default filterCinema.reducer