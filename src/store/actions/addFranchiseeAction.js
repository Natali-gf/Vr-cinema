import axios from 'axios';
import api from "../../api/axios";
import { fetchError } from '../slices/addFranchiseeSlice';
import { showAddFranchisee } from '../slices/windowStateSlice';

export function addFranchiseeRequest (dispatch, data){
	const options = {
		method: 'POST',
		headers: { 'accept': 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': 'KvOjWKdvHYXIoBMkKpI8uKgcJkY3OufLCvQpvJX0MN92YFkdz0DWYrbMX13JDW8u' },
		data: JSON.stringify(data),
		url: 'http://xn--b1addb8bgoi2a.xn--p1ai:8000/api/auth/users/'
	};

	axios(options)
		.then(res => {
			console.log(res);
			console.log(res.data);
			dispatch(showAddFranchisee(false))
		})

        .catch (message =>{
			dispatch(fetchError(message.response.data))
			console.log(message);
		}
	)
}
