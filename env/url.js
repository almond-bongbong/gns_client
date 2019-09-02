const isProduction = process.env.NODE_ENV === 'production';

export const apiUrl = isProduction ? 'http://gns-api.azeet.io' : 'http://192.168.219.154:4000';

export default null;
