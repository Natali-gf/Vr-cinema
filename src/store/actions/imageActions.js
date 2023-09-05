import api from "../../api/axios";
import apiUploadFile from '../../api/axiosUploadFile';
import { fetchError } from "../slices/imageSlice";
import { showErrorNotification } from "../slices/notification";

export async function postImageRequest (dispatch, data) {
	const result = await apiUploadFile.post(`/imagine/`, data)
		.then((response) => {
			// console.log('response', response);
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

			dispatch(fetchError(message.message));
			dispatch(showErrorNotification(true));
		})
	return result;
}

export async function putImageRequest (dispatch, data, imageId) {
	const result = await apiUploadFile.put(`/imagine/${imageId}/`, data)
		.then((response) => {
			// console.log('response', response);
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

			dispatch(fetchError(message.message));
			dispatch(showErrorNotification(true));
		})
	return result;
}

export async function deleteImageRequest (imageId) {
	const result = await api.delete(`/imagine/${imageId}/`)
		.then((response) => {
			// console.log('response', response);
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

		})
	return result;
}

// export async function postTypeCinemaRequest (dispatch, data) {
// 	const options = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		data: JSON.stringify(data),
// 		url: 'https://cc27639.tw1.ru/api/type_cinema/'
// 	};
//     dispatch(fetching());
// 	axios(options)
// 		.then(response => {
// 			console.log(response); console.log(response.data);
// 			dispatch(getTypeCinemaRequest());
// 		})
// 		.catch (message =>{
// 			dispatch(fetchError(message.response.data));
//             console.log(message);
// 		})
// }
