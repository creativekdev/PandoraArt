import axios from 'axios';
// Create an instance of axios
const api = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

api.interceptors.request.use(
    (config) => {    
        const bearerToken = 
            localStorage.getItem('jwt_access_token') !== undefined ? 
            localStorage.getItem('jwt_access_token') : null;

        config.headers['Authorization'] = bearerToken;

        return config;
    }
);

export default api;
