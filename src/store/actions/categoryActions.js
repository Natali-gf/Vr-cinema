import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError } from '../slices/categorySlice';
import { sortByName } from '../../helpers/helpers';
import { setNotificationText, showNotification } from "../slices/notification";

export const getCategoryRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/category/')
            dispatch(fetchSuccess( response.data.sort(sortByName) ))
        } catch (e) {
            dispatch(fetchError(e))
			console.log('error', e);
        }
    }
}

export async function postCategoryRequest (dispatch, data) {
    dispatch(fetching());
    const result = await api.post(`/category/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getCategoryRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Жанр добавлен'));
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

export async function putCategoryRequest (dispatch, data, сategoryId) {
    dispatch(fetching());
    const result = await api.put(`/category/${сategoryId}/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(getCategoryRequest());
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

export async function deleteCategoryRequest (dispatch, сategoryId) {
    dispatch(fetching());
    const result = await api.delete(`/category/${сategoryId}/`)
        .then((response) => {
            console.log(response);
            dispatch(getCategoryRequest());
            dispatch(showNotification(true));
			dispatch(setNotificationText('Жанр удалён'))
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
