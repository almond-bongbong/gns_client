import Router from 'next/router';
import { message } from 'antd';

export const makeRedirect = (ctx, toUrl, useReturn = true) => {
  const { req, res, isServer, store } = ctx;
  const returnUrl = useReturn ? `?next=${isServer ? req.url : ctx.asPath}` : '';
  if (isServer) {
    res.writeHead(302, { Location: `${toUrl}${returnUrl}` });
    res.end();
  } else {
    message.warning('로그인 해주세요');
    Router.push(`${toUrl}${returnUrl}`);
  }
};

export default null;