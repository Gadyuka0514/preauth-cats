import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type':'application/json',
    },   
});

let accessToken = '';

export function setAccessToken(newToken) {
    accessToken = newToken;
}


axiosInstance.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`; 
    }
    return config;
})

axiosInstance.interceptors.response.use((response) => responce, async (error) => {
    const prevRequest = error.config;
    if (error.responce.status === 403 && !prevRequest.sent) {
        const responce = await axios('/api/tokens/refresh');
        accessToken = responce.data.accessToken;
        prevRequest.sent = true;
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
});


export default axiosInstance;