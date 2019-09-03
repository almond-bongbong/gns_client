import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import configStore from 'store/configure';
import { initAxios, setAuthorization } from 'config/configureAxios';
import { cookieParser } from 'lib/cookie';
import { makeRedirect } from 'lib/route';
import { authActions } from 'store/modules/auth';
import GlobalStyle from 'style/GlobalStyle';
import BasicLayout from 'components/Layout/BasicLayout';
import * as Sentry from '@sentry/browser';
import { isProduction } from 'env';

if (isProduction) Sentry.init({ dsn: 'https://505087c8ac8247c48175775304a0f516@sentry.io/1550279' });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

initAxios();

const MyApp = ({ Component, store, pageProps }) => (
  <Container>
    <Head>
      <title>azeet</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.21.4/antd.min.css" />
      <script src="//developers.kakao.com/sdk/js/kakao.min.js" />
      <script src="../static/lib/naveridlogin_js_sdk_2.0.0.js" />
    </Head>

    <Provider store={store}>
      <GlobalStyle />
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </Provider>
  </Container>
);

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { store, req, isServer } = ctx;
  if (isServer) {
    const { authorization } = cookieParser(req.headers.cookie);
    if (authorization) {
      try {
        setAuthorization(authorization);
        await store.dispatch(authActions.auth());
      } catch (e) {
        console.error(e);
      }
    }
  }

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const { me } = store.getState().auth;
  if (pageProps?.onlyAnonymous && me) makeRedirect(ctx, '/', false);
  if (pageProps?.isPrivate && !me) makeRedirect(ctx, '/login');

  return { pageProps };
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  store: PropTypes.shape({}).isRequired,
  pageProps: PropTypes.shape({}),
};

MyApp.defaultProps = {
  pageProps: undefined,
};

export default withRedux(configStore)(MyApp);
