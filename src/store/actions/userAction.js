import api from "../../api/axios";
import { fetchSuccess, fetchError, fetchErrorMessage } from '../slices/userSlice';
import { setErrorNotificationText, setNotificationText, showErrorNotification, showNotification } from '../slices/notification';

export const getUserDataRequest = () => {
    return async (dispatch) => {
        try {
            const response = await api.get('/auth/users/me/');
            dispatch(fetchSuccess( response.data ));

        } catch (message) {
            console.log('error', message);
            if(message.response?.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.hash = '';
                return;
            }

            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export async function userSetLoginRequest (dispatch, data) {
	const result = await api.post(`/auth/users/set_username/`, JSON.stringify(data))
		.then((response) => {
			// console.log('response', response);
            dispatch(showNotification(true));
			dispatch(setNotificationText('Логин изменён'));
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
            if(message.response?.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                // window.location.href = '/authorization';
                return;
            }

            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
                dispatch(setErrorNotificationText(message.response.data?.new_username))
                dispatch(showErrorNotification(true));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
		})
	return result
}

export async function userSetPasswordRequest (dispatch, data) {
	const result = await api.post(`/auth/users/set_password/`, JSON.stringify(data))
		.then((response) => {
			// console.log('response', response);
            dispatch(showNotification(true));
			dispatch(setNotificationText('Пароль изменён'));
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
            if(message.response?.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
                dispatch(setErrorNotificationText(message.response.data?.new_username))
                dispatch(showErrorNotification(true));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
		})
	return result
}

export async function userSetNameRequest (dispatch, data, userId) {
	const result = await api.put(`/admin/${userId}/`, JSON.stringify(data))
		.then((response) => {
			// console.log('response', response);
            dispatch(showNotification(true));
			dispatch(setNotificationText('Имя изменёно'));
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
            if(message.response?.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
                dispatch(setErrorNotificationText(message.response.data?.new_username))
                dispatch(showErrorNotification(true));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
		})
	return result
}
