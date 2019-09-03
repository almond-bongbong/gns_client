import React, { useState } from 'react';
import Router from 'next/router';
import { message } from 'antd';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { authActions } from 'store/modules/auth';
import { setAuthorization } from 'config/configureAxios';
import naverAuth from 'lib/naverAuth';
import kakaoAuth from 'lib/kakaoAuth';

const { naverLogin, authUrl } = naverAuth();
const Kakao = kakaoAuth();

const Login = () => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const loginKakao = async (authResponse) => {
    const token = authResponse.access_token;
    try {
      const { data } = await axios({ method: 'get', url: '/auth/kakao', params: { access_token: token } });
      if (data.token) {
        Cookie.set('authorization', data.token);
        setAuthorization();
        await dispatch(authActions.fetchMyAccount());
        message.success('로그인 되었습니다');
        if (data.first) Router.push('/profile/info');
        else Router.replace('/');
      } else {
        message.success('문제가 발생했습니다');
      }
    } catch(e) {
      console.error(e);
      message.success('문제가 발생했습니다');
    } finally {
      setPending(false);
    }
  };

  const handleKakao = () => {
    setPending(true);
    Kakao.Auth.login({
      success: loginKakao,
      fail: () => {
        alert('error');
        setPending(false);
      },
    });
  };

  const handleNaver = () => {
    window.open(authUrl);
  };

  return (
    <div id="login">
      <div className="area-login">
        <div className="title">로그인</div>
        <button type="button" onClick={handleKakao}>
          <img src="/static/images/common/btn_login_kakao.png" alt="카카오 로그인" />
        </button>
        <button type="button" onClick={handleNaver}>
          <img src="/static/images/common/btn_login_naver.png" alt="네이버 로그인" />
        </button>
      </div>
    </div>
  );
};

Login.getInitialProps = () => ({ onlyAnonymous: true });

export default Login;