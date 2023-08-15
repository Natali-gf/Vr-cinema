import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError, fetchErrorMessage } from '../slices/categorySlice';
import { sortByName } from '../../helpers/helpers';
import { setNotificationText, showNotification, showErrorNotification } from "../slices/notification";

export const getCategoryRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/category/')
            dispatch(fetchSuccess( response.data.sort(sortByName) ))
        } catch (message) {
            console.log('error', message);
            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export async function postCategoryRequest (dispatch, data) {
    dispatch(fetching());
    const result = await api.post(`/category/`, JSON.stringify(data))
        .then((response) => {
            console.log('response', response);
            dispatch(getCategoryRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Жанр добавлен'));
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

export async function putCategoryRequest (dispatch, data, сategoryId) {
    dispatch(fetching());
    const result = await api.put(`/category/${сategoryId}/`, JSON.stringify(data))
        .then((response) => {
            console.log('response', response);
            dispatch(getCategoryRequest());
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

export async function deleteCategoryRequest (dispatch, сategoryId) {
    dispatch(fetching());
    const result = await api.delete(`/category/${сategoryId}/`)
        .then((response) => {
            console.log('response', response);
            dispatch(getCategoryRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Жанр удалён'))
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
