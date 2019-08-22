import axios from 'axios';

export const getMyAccount = () => axios.get('/account');