import axios from 'axios';
import { useAuthStore } from '../hooks/store/AuthStore';
import BASE_URL from './getUrlEnv';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});


interface TypeFailedQueue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (reason?: any) => void,
    resolve: (value: unknown) => void
}

axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        console.log({ token })
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: TypeFailedQueue[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axiosInstance(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token_catalogos');
            if (!refreshToken) {
                console.log('No hay refresh token disponible');
                useAuthStore.getState().logout();
                return Promise.reject(error);
            }
            console.log({ refreshToken });
            return new Promise(async (resolve, reject) => {
                try {

                    const { data } = await axios.post(BASE_URL + '/users/refresh', { refreshToken }, {
                        headers: {
                            'Authorization': 'Bearer ' + refreshToken
                        }
                    });

                    const newAccessToken = data?.result.access_token;
                    const newRefreshToken = data?.result.refresh_token;
                    useAuthStore.getState().setTokens(newAccessToken);
                    useAuthStore.getState().setRefreshTokens(newRefreshToken);
                    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                    originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                    localStorage.setItem('refresh_token_catalogos', newRefreshToken);
                    processQueue(null, newAccessToken);
                    resolve(axiosInstance(originalRequest));
                } catch (err) {
                    console.log('Error al refrescar el token:', err);
                    processQueue(err, null);
                    useAuthStore.getState().logout();
                    reject(err);
                } finally {
                    isRefreshing = false;
                }
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;