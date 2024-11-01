import axios from 'axios';

const urlBase = "http://localhost:5213/api"; 
const Api = axios.create({
    baseURL: urlBase 
});

export default Api;
