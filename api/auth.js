import axios from 'axios';

export const auth = token => axios({ method: 'post', url: '/auth', headers: { 'authorization': token } });