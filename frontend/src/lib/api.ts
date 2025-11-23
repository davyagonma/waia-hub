import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
console.log('API Base URL:', baseURL);

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear token and redirect to login if unauthorized
            // We avoid direct window.location assignment to allow the AuthContext to handle it if possible,
            // but for a global interceptor, sometimes it's necessary or we just let the error propagate
            // and handle it in the component/context.
            // For now, we'll just reject the promise.
            // Optionally: localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default api;
