import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.360.skroy.ru/api/',

    headers: { 'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('authorizationToken')}`
             },
});