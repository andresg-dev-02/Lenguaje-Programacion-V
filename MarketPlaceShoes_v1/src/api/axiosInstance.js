import axios from 'axios';

const api = axios.create({
    baseURL: 'https://lenguaje-programacion-v-1.onrender.com/api/',
});

// Interceptor para manejar la autenticación dinámica
api.interceptors.request.use(
    (config) => {
        // Si el flag useAuth está presente y es verdadero
        if (config.useAuth) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
