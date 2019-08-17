import React from 'react';
import Router from 'next/router'
import { Card, message } from 'antd';
import axios from 'axios';
import useKakao from '../hooks/useKakao';
import Cookie from 'js-cookie';
import '../resources/styles/login.scss';

const Login = () => {
  const Kakao = useKakao();

  const loginKakao = async (authResponse) => {
    const token = authResponse.access_token;
    const response = await axios({ method: 'get', url: 'http://localhost:4000/auth/kakao', params: { access_token: token } });
    Cookie.set('authorization', response.token);
    message.success('로그인 되었습니다');
    Router.push('/');
  };

  const handleKakao = () => {
    Kakao.Auth.login({
      success: loginKakao,
      fail: () => { alert('error'); },
    });
  };

  const handleAuth = async () => {
    const token = Cookie.get('authorization');
    const response = await axios({ method: 'post', url: 'http://localhost:4000/auth', headers: { 'authorization': token } });
    console.log(response);
  };

  return (
    <div id="login">
      <div className="btn-login">
        <Card title="로그인" bordered={false}>
          <button type="button" onClick={handleKakao}>
            <img src="/static/images/common/btn_login_kakao.png" alt="카카오 로그인" />
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Login;