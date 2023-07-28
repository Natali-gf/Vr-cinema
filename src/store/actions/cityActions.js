import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError } from '../slices/citySlice';
import { sortByName } from '../../helpers/helpers';
import { setNotificationText, showNotification } from "../slices/notification";
import axios from "axios";

export const getCityRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/city/')
            dispatch(fetchSuccess( response.data.sort(sortByName) ))
        } catch (e) {
            dispatch(fetchError(e))
			console.log('error');
        }
    }
}

export async function postCityRequest (dispatch, data) {
    dispatch(fetching());
    const result = await api.post(`/city/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getCityRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Город добавлен'));
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

export async function putCityRequest (dispatch, data, cityId) {
    dispatch(fetching());
    const result = await api.put(`/city/${cityId}/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getCityRequest());
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

export async function deleteCityRequest (dispatch, cityId) {
    dispatch(fetching());
    const result = await api.delete(`/city/${cityId}/`)
        .then((response) => {
            console.log(response);
            dispatch(getCityRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Город удалён'))
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