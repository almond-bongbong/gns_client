import { isProduction } from 'env';

export const apiUrl = isProduction ? 'https://gns-api.azeet.io' : 'http://192.168.219.154:4000';

export default null;
