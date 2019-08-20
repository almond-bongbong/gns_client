import axios from 'axios';

export const auth = () => axios({ method: 'post', url: '/auth' });