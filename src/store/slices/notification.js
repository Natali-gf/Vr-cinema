import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	notificationText: '',
	notificationVisible: false,
}

	export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotificationText(state, action) {
			state.notificationText = action.payload;
		},
        showNotification(state, action){
            state.notificationVisible = action.payload
        },
	},
})

export const { setNotificationText, showNotification } = notificationSlice.actions

export default notificationSlice.reducer