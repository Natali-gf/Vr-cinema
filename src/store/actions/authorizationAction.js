import api from "../../api/axios";
import { setErrorNotificationText, showErrorNotification } from '../slices/notification';

export const logoutRequest = () => {
	api.post('/auth/token/logout/')
		.then(() => {
			localStorage.removeItem('authorizationToken')
			window.location.href = '/authorization';
		})
		.catch((message) => {
			console.log('error', message);
		})
}


export async function authorizationRequest (dispatch, data) {

	const result = await api.post(`/auth/token/login/`, JSON.stringify(data))
		.then((response) => {
			// console.log('response', response);
			localStorage.setItem('authorizationToken', `Token ${response.data.auth_token}`);
			window.location.href = '/';
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
			if(typeof message.response.data === 'object'){
				dispatch(setErrorNotificationText(message.response.data.non_field_errors))
            }
			dispatch(showErrorNotification(true));
		})

	return result
}
