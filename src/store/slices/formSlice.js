import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	formAdd: '',
}

	export const form = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setFormAdd(state, action) {
			state.formAdd = action.payload;
		},
	},
})

export const { setFormAdd } = form.actions

export default form.reducer

//?delete