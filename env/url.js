const isProduction = process.env.NODE_ENV === 'production';

export const apiUrl = isProduction ? 'http://13.209.56.51:4000' : 'http://192.168.219.150:4000';

export default null;
