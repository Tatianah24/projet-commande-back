import axios from 'axios';
import {requestErrorHandler, requestInterceptor, responseErrorHandler, responseInterceptor} from './AxiosHelperMethods';

const baseURL = "http://10.0.2.2/php_rest_commande/api";
const axiosAPI = axios.create({
    baseURL: baseURL,
});

axiosAPI.interceptors.request.use(requestInterceptor, requestErrorHandler);
axiosAPI.interceptors.response.use(responseInterceptor, responseErrorHandler);

export default axiosAPI;