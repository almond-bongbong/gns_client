export const cookieParser = str => str && str.split('; ').reduce((acc, cur) => {
  const [name, value] = cur.split('=');
  return { ...acc, [name]: value };
}, {}) || {};

export default null;