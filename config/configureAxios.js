import axios from 'axios';
import qs from 'query-string';
import Cookie from 'js-cookie';

export const apiUrl = process.env.NODE_ENV === 'production' ? 'https://gns-server.herokuapp.com/' : 'http://192.168.219.150:4000';

export function setAuthorization(token = Cookie.get('authorization')) {
  if (token) axios.defaults.headers.common.Authorization = token;
}

export function initAxios() {
  if (axios.interceptors.response.handlers.length > 0) return;
  axios.defaults.baseURL = apiUrl;
  axios.defaults.timeout = 8000;
  axios.defaults.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });
  axios.interceptors.response.use(response => response.data, (error) => {
    if (error.response) return Promise.reject(error.response);
    return Promise.reject(error);
  });
  setAuthorization();
}