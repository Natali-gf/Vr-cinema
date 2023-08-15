import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	notificationText: '',
	notificationVisible: false,
	errorNotificationText: '',
	errorNotificationVisible: false,
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
		setErrorNotificationText(state, action) {
			state.errorNotificationText = action.payload;
		},
        showErrorNotification(state, action){
            state.errorNotificationVisible = action.payload
        },
	},
})

export const { setNotificationText, showNotification,
	setErrorNotificationText, showErrorNotification } = notificationSlice.actions

export default notificationSlice.reducer