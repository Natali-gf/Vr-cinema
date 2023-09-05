import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError, fetchingCurrentCinema, fetchCurrentCinemaSuccess, fetchErrorMessage } from '../slices/cinemaSlice';
import { showCinemaAdd, showCinemaEdit } from '../slices/windowStateSlice';
import { setNotificationText, showErrorNotification, showNotification } from '../slices/notification';

export const getCinemaRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/cinema/');
            dispatch(fetchSuccess( response.data ));
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export const getCurrentCinemaRequest = (cinemaId) => {
    return async (dispatch) => {
        try {
            dispatch(fetchingCurrentCinema());
            const response = await api.get(`/cinema/${cinemaId}`)
            dispatch(fetchCurrentCinemaSuccess( response.data ));

			return response;
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export async function postCinemaRequest (dispatch, data) {
    const result = await api.post(`/cinema_add/`, JSON.stringify(data))
        .then((response) => {
            // console.log(response);
            dispatch(showCinemaAdd(false));
			dispatch(getCinemaRequest());
			dispatch(showNotification(true));
			dispatch(setNotificationText('Кинотеатр добавлен'));
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);

            return response.data;
        })
        .catch((message) => {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
        })
    return result;
}

export async function putCinemaRequest (dispatch, data, cinemaId, state) {
    const result = await api.put(`/cinema_add/${cinemaId}/`, JSON.stringify(data))
        .then((response) => {
            // console.log(response);
            dispatch(showCinemaEdit(false));
			dispatch(getCinemaRequest());
			dispatch(showNotification(true));
			if(state === 'on'){
				dispatch(setNotificationText('Кинотеатр действующий'));
			} else if(state === 'off'){
				dispatch(setNotificationText('Кинотеатр не действующий'))
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
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
        })
    return result;
}
