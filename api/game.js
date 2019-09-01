import axios from 'axios';

export const lol = (id) => axios.get(`/game/lol/${id}`);

export default null;
