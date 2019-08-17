import React from 'react';
import Head from 'next/head';
import { Container } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { initAxios } from '../config/configureAxios';
import '../resources/styles/style.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

initAxios();

const MyApp = ({ Component, pageProps }) => (
  <Container>
    <Head>
      <title>azeet</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.21.4/antd.min.css" />
      <script src="//developers.kakao.com/sdk/js/kakao.min.js" />
    </Head>

    <Component {...pageProps} />
  </Container>
);

export default MyApp;
