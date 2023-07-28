import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError } from '../slices/typeCinemaSlice';
import { sortByName } from '../../helpers/helpers';
import { setNotificationText, showNotification } from "../slices/notification";

export const getTypeCinemaRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/type_cinema/')
            dispatch(fetchSuccess( response.data.sort(sortByName) ))
        } catch (e) {
            dispatch(fetchError(e))
			console.log('error');
        }
    }
}

export async function postTypeCinemaRequest (dispatch, data) {
    dispatch(fetching());
    const result = await api.post(`/type_cinema/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getTypeCinemaRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Тип кинотеатра добавлен'));
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

export async function putTypeCinemaRequest (dispatch, data, typeCinemaId) {
    dispatch(fetching());
    const result = await api.put(`/type_cinema/${typeCinemaId}/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getTypeCinemaRequest());
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

export async function deleteTypeCinemaRequest (dispatch, typeCinemaId) {
    dispatch(fetching());
    const result = await api.delete(`/type_cinema/${typeCinemaId}/`)
        .then((response) => {
            console.log(response);
            dispatch(getTypeCinemaRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Тип кинотеатра удалён'))
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
