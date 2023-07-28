import api from "../../api/axios";
import apiUploadFile from '../../api/axiosUploadFile';

export async function postImageRequest (data) {
	const result = await apiUploadFile.post(`/imagine/`, data)
		.then((response) => {
			console.log(response);
			return response.data;
		})
		.catch((message) => {
			console.log(message);
		})
	return result;
}

export async function putImageRequest (data, imageId) {
	const result = await apiUploadFile.put(`/imagine/${imageId}/`, data)
		.then((response) => {
			console.log(response);
			return response.data;
		})
		.catch((message) => {
			console.log(message);
		})
	return result;
}

export async function deleteImageRequest (imageId) {
	const result = await api.delete(`/imagine/${imageId}/`)
		.then((response) => {
			console.log(response);
			return response.data;
		})
		.catch((message) => {
			console.log(message);
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
