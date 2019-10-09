import axios from 'axios';

export const getChatById = (id) => axios.get(`/chat/${id}`);
export const createChat = (data) => axios.post('/chat', data);
