const naver = typeof window !== 'undefined' && window.naver;

export const naver = () => {
  if (naver) {
    naver = new naver.LoginWithNaverId({
      clientId: '03WshoRl9R8iw_SfBf5R',
      callbackUrl: `http://${window.location.hostname}/callback/naver`,
      isPopup: true,
      loginButton: {color: "green", type: 3, height: 60},
    });

    naver.init();
  }

  return {
    naverLogin: naver,
    authUrl: naver.generateAuthorizeUrl(),
  };
};