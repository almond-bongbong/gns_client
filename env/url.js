import { isProduction } from 'env';

export const apiUrl = isProduction ? 'https://gns-api.azeet.io' : 'http://localhost:4000';

export default null;
