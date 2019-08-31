import Router from 'next/router';

export const makeRedirect = (ctx, toUrl, useReturn = true) => {
  const { req, res, isServer } = ctx;
  const returnUrl = useReturn ? `?next=${isServer ? req.url : ctx.asPath}` : '';
  if (isServer) {
    res.writeHead(302, { Location: `${toUrl}${returnUrl}` });
    res.end();
  } else if (returnUrl) {
    Router.push(`${toUrl}${returnUrl}`);
  }
};

export default null;