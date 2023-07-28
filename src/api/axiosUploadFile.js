import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.360.skroy.ru/api/',
    // baseURL: 'https://cc27639.tw1.ru/api/',
    headers: { 'Content-Type': 'multipart/form-data' },
});