import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.360.skroy.ru/api/',
    headers: { 'Content-Type': 'multipart/form-data',
                'Authorization': `${localStorage.getItem('authorizationToken')}` },
});