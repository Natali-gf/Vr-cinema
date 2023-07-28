import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError } from '../slices/languageSlice';
import { sortByName } from '../../helpers/helpers';
import { setNotificationText, showNotification } from "../slices/notification";

export const getLanguageRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/language/')
            dispatch(fetchSuccess( response.data.sort(sortByName) ))
        } catch (e) {
            dispatch(fetchError(e))
			console.log('error');
        }
    }
}

export async function postLanguageRequest (dispatch, data) {
    dispatch(fetching());
    const result = await api.post(`/language/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getLanguageRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Озвучка добавлена'));
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
            return response;
        })
        .catch((message) => {
            dispatch(fetchError(message.response.data));
            console.log(message)
        })
    return result;
}

export async function putLanguageRequest (dispatch, data, languageId) {
    dispatch(fetching());
    const result = await api.put(`/language/${languageId}/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getLanguageRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Изменения сохранены'))
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
            return response;
        })
        .catch((message) => {
            dispatch(fetchError(message.response.data));
            console.log(message)
        })
    return result;
}

export async function deleteLanguageRequest (dispatch, languageId) {
    dispatch(fetching());
    const result = await api.delete(`/language/${languageId}/`)
        .then((response) => {
            console.log(response);
            dispatch(getLanguageRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Озвучка удалена'))
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
            return response;
        })
        .catch((message) => {
            dispatch(fetchError(message.response.data));
            console.log(message)
        })
    return result;
}
