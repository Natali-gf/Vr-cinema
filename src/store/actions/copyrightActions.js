import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError, fetchErrorMessage } from '../slices/copyrightSlice';
import { sortByName } from '../../helpers/helpers';
import { setNotificationText, showErrorNotification, showNotification } from "../slices/notification";

export const getCopyrightRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/copyright_holder/')
            dispatch(fetchSuccess( response.data.sort(sortByName) ))
        } catch (message) {
            console.log('error', message)
            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export async function postCopyrightRequest (dispatch, data) {
    dispatch(fetching());
    const result = await api.post(`/copyright_holder/`, JSON.stringify(data))
        .then((response) => {
            console.log('response', response);
            dispatch(getCopyrightRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Студия добавлена'));
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
            return response;
        })
        .catch((message) => {
            console.log('error', message);
            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
        })
    return result;
}

export async function putCopyrightRequest (dispatch, data, copyrightId) {
    dispatch(fetching());
    const result = await api.put(`/copyright_holder/${copyrightId}/`, JSON.stringify(data))
        .then((response) => {
            console.log('response', response);
            dispatch(getCopyrightRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Изменения сохранены'))
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
            return response;
        })
        .catch((message) => {
            console.log('error', message);
            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
        })
    return result;
}

export async function deleteCopyrightRequest (dispatch, copyrightId) {
    dispatch(fetching());
    const result = await api.delete(`/copyright_holder/${copyrightId}/`)
        .then((response) => {
            console.log('response', response);
            dispatch(getCopyrightRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Студия удалена'))
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
            return response;
        })
        .catch((message) => {
            console.log('error', message);
            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
        })
    return result;
}
