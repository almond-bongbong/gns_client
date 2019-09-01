import axios from 'axios';

export const getChatRoomById = (id) => axios.get(`/chatroom/${id}`);
export const createChatRoom = (data) => axios.post('/chatroom', data);