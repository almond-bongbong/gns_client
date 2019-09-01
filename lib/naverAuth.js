const naver = typeof window !== 'undefined' && window.naver;

export default () => {
  if (naver) {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '03WshoRl9R8iw_SfBf5R',
      callbackUrl: `http://${window.location.hostname}/callback/naver`,
      isPopup: true,
    });

    naverLogin.init();

    return {
      naverLogin,
      authUrl: naverLogin.generateAuthorizeUrl(),
    };
  }

  return {};
};
