import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError, fetchingCurrentFilm, fetchCurrentFilmSuccess, fetchErrorMessage } from '../slices/filmSlice';
import { showFilmAdd, showFilmEdit } from '../slices/windowStateSlice';
import { setNotificationText, showErrorNotification, showNotification } from '../slices/notification';

export const getFilmRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/films/');
            dispatch(fetchSuccess( response.data ));
        } catch (message) {
            console.log('error', message)
            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export const getCurrentFilmRequest = (filmId) => {
    return async (dispatch) => {
        try {
            dispatch(fetchingCurrentFilm());
            const response = await api.get(`/films/${filmId}`)
            dispatch(fetchCurrentFilmSuccess( response.data ));

			return response;
        } catch (message) {
            console.log('error', message)
            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export async function postFilmRequest (dispatch, data) {
	// dispatch(fetching());
	const result = await api.post(`/film_add/`, JSON.stringify(data))
		.then((response) => {
			console.log('response', response);
			dispatch(showFilmAdd(false));
			dispatch(getFilmRequest());
			dispatch(showNotification(true));
			dispatch(setNotificationText('Фильм добавлен'));
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
			return response.data;
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
	return result
}

export async function putFilmRequest (dispatch, data, filmId, state) {
	// dispatch(fetching());
	const result = await api.put(`/film_add/${filmId}/`, JSON.stringify(data))
		.then((response) => {
			console.log('response', response);
			dispatch(showFilmEdit(false));
			dispatch(getFilmRequest());
			dispatch(showNotification(true));
			if(state === 'on'){
				dispatch(setNotificationText('Фильм опубликован'));
			} else if(state === 'off'){
				dispatch(setNotificationText('Фильм перемещен в архив'))
			} else {
				dispatch(setNotificationText('Изменения сохранены'))
			}
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
			return response.data;
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
	return result
}
