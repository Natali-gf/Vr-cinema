import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError, fetchingCurrentFranchisee, fetchCurrentFranchiseeSuccess, fetchErrorMessage } from '../slices/franchiseeSlice';
import { showFranchiseeAdd, showFranchiseeEdit } from '../slices/windowStateSlice';
import { setNotificationText, showErrorNotification, showNotification } from '../slices/notification';


export const getFranchiseeRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/franchisee/');
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

export const getCurrentFranchiseeRequest = (franchiseeId) => {
    return async (dispatch) => {
        try {
            dispatch(fetchingCurrentFranchisee());
            const response = await api.get(`/franchisee/${franchiseeId}`);
            dispatch(fetchCurrentFranchiseeSuccess( response.data ));
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

export async function postFranchiseeRequest (dispatch, data) {
    const result = await api.post(`/franchisee/`, JSON.stringify(data))
        .then((response) => {
            // console.log('response', response);
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

export async function putFranchiseeRequest (dispatch, data, franchiseeId) {
    const result = await api.put(`/franchisee/${franchiseeId}/`, JSON.stringify(data))
        .then((response) => {
            // console.log('response', response);
            dispatch(showFranchiseeEdit(false));
			dispatch(getFranchiseeRequest());
			dispatch(showNotification(true));
			dispatch(setNotificationText('Изменения сохранены'))
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
