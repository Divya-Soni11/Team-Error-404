import axios from 'axios';

const API = axios.create({
    // Point this to your backend Express server port (usually 3000 or 5000)
    baseURL: 'http://localhost:3000/api', 
    headers: {
        'Content-Type': 'application/json',
    }
});

// Auto-attaches your JWT token to headers if a user/company is logged in
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;