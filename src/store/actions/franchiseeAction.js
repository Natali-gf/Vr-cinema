import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError, fetchingCurrentFranchisee, fetchCurrentFranchiseeSuccess } from '../slices/franchiseeSlice';
import { showFranchiseeAdd, showFranchiseeEdit } from '../slices/windowStateSlice';
import { setNotificationText, showNotification } from '../slices/notification';


export const getFranchiseeRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/franchisee/');
            dispatch(fetchSuccess( response.data ));
        } catch (e) {
            dispatch(fetchError(e))
        }
    }
}

export const getCurrentFranchiseeRequest = (franchiseeId) => {
    return async (dispatch) => {
        try {
            dispatch(fetchingCurrentFranchisee());
            const response = await api.get(`/franchisee/${franchiseeId}`)
            dispatch(fetchCurrentFranchiseeSuccess( response.data ));
        } catch (e) {
            dispatch(fetchError(e));
        }
    }
}

export async function postFranchiseeRequest (dispatch, data) {
	dispatch(fetching());
    const result = await api.post(`/franchisee/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(showFranchiseeAdd(false));
			dispatch(getFranchiseeRequest());
			dispatch(showNotification(true));
			dispatch(setNotificationText('Франчайзи добавлен'));
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

export async function putFranchiseeRequest (dispatch, data, franchiseeId) {
	dispatch(fetching());
    const result = await api.put(`/franchisee/${franchiseeId}/`, JSON.stringify(data))
        .then((response) => {
            console.log(response);
            dispatch(showFranchiseeEdit(false));
			dispatch(getFranchiseeRequest());
			dispatch(showNotification(true));
			dispatch(setNotificationText('Изменения сохранены'))
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
			return response.data;
            return response.data;
        })
        .catch((message) => {
            dispatch(fetchError(message.response.data));
            console.log(message)
        })
    return result;
}
