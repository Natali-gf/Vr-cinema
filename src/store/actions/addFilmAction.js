import axios from 'axios';
import api from "../../api/axios";
// import { useSelector } from "react-redux";

export function addFilmRequest (data){

	const options = {
		method: 'POST',
		headers: { 'accept': 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': 'ujyJlGBATadKFusCf2Abzw1zVhbCIz7lmjAPUFl5YZp4fy0v4DvZ3dW99Ygix104' },
		data: JSON.stringify(data),
		url: 'http://xn--b1addb8bgoi2a.xn--p1ai:8000/api/add_films_1/'
	};
	axios(options)
		.then(res => {
			console.log(res);
			console.log(res.data);
		})
}
