import axios from 'axios';
import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError, fetchingCurrentCinema, fetchCurrentCinemaSuccess } from '../slices/cinemaSlice';
import { showCinemaAdd, showCinemaEdit } from '../slices/windowStateSlice';
import { setNotificationText, showNotification } from '../slices/notification';

export const getCinemaRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/cinema/');
            dispatch(fetchSuccess( response.data ));
        } catch (e) {
            dispatch(fetchError(e))
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
        } catch (e) {
            dispatch(fetchError(e));
        }
    }
}

export async function postCinemaRequest (dispatch, data) {
	dispatch(fetching());
    const result = await api.post(`/cinema/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
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
            dispatch(fetchError(message.response.data));
            console.log(message)
        })
    return result;
}

export async function putCinemaRequest (dispatch, data, cinemaId, state) {
	dispatch(fetching());
    const result = await api.put(`/cinema/${cinemaId}/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
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
            dispatch(fetchError(message.response.data));
            console.log(message)
        })
    return result;
}
