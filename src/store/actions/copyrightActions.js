import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError } from '../slices/copyrightSlice';
import { sortByName } from '../../helpers/helpers';
import { setNotificationText, showNotification } from "../slices/notification";

export const getCopyrightRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/copyright_holder/')
            dispatch(fetchSuccess( response.data.sort(sortByName) ))
        } catch (e) {
            dispatch(fetchError(e))
			console.log('error');
        }
    }
}

export async function postCopyrightRequest (dispatch, data) {
    dispatch(fetching());
    const result = await api.post(`/copyright_holder/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getCopyrightRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Студия добавлена'));
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

export async function putCopyrightRequest (dispatch, data, copyrightId) {
    dispatch(fetching());
    const result = await api.put(`/copyright_holder/${copyrightId}/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getCopyrightRequest());
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

export async function deleteCopyrightRequest (dispatch, copyrightId) {
    dispatch(fetching());
    const result = await api.delete(`/copyright_holder/${copyrightId}/`)
        .then((response) => {
            console.log(response);
            dispatch(getCopyrightRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Студия удалена'))
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
