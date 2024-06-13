import axios from 'axios';
import Cookies from 'js-cookie';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001', // Set your base URL here
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = Cookies.get('auth');
        if (authToken) {
            config.headers.Authorization = `${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
