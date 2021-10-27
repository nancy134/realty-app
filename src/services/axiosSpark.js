import axios from 'axios';
import LocalStorage from './localStorage';

const localStorageService = LocalStorage.getService();

const axiosSpark = axios.create({});

axiosSpark.interceptors.request.use(
    config => {
        const token = localStorageService.sparkAccessToken();
        if (token){
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error);
    });

/*
axiosSpark.interceptors.response.use((response) => {
    return response
}, function(error){
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        const refreshToken = localStorageService.sparkRefreshToken();

        return axiosInstance.post(process.env.REACT_APP_API+'refreshToken',
            {
                "refreshToken": refreshToken
            }).then(res => {
                if (res.status === 201) {
                    localStorageService.setSparkAccessToken(res.data.IdToken);
                    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.sparkAccessToken();
                    return axiosInstance(originalRequest)
                }
            })
    }
    return Promise.reject(error);
});
*/

export default axiosSpark;
