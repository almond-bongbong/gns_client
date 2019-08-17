import React, { useState } from 'react';
import Router from 'next/router'
import { Card, message, Spin } from 'antd';
import axios from 'axios';
import useKakao from '../hooks/useKakao';
import Cookie from 'js-cookie';
import '../resources/styles/login.scss';

const Login = () => {
  const Kakao = useKakao();
  const [pending, setPending] = useState(false);

  const loginKakao = async (authResponse) => {
    const token = authResponse.access_token;
    try {
      const response = await axios({ method: 'get', url: '/auth/kakao', params: { access_token: token } });
      if (response.token) {
        Cookie.set('authorization', response.token);
        message.success('로그인 되었습니다');
        Router.push('/');
      }
    } catch(e) {
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

  const handleAuth = async () => {
    const token = Cookie.get('authorization');
    const response = await axios({ method: 'post', url: '/auth', headers: { 'authorization': token } });
    console.log(response);
  };

  return (
    <div id="login">
      <div className="btn-login">
        <Card title="로그인" bordered={false}>
          {pending ? (
            <div className="btn-pending-kakao">
              <Spin size="large" />
            </div>
          ) : (
            <button type="button" onClick={handleKakao}>
              <img src="/static/images/common/btn_login_kakao.png" alt="카카오 로그인" />
            </button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;