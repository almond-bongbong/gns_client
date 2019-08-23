import React, { useState } from 'react';
import Router from 'next/router'
import { Card, message, Spin } from 'antd';
import axios from 'axios';
import useKakao from '../hooks/useKakao';
import Cookie from 'js-cookie';
import '../resources/styles/login.scss';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/modules/auth';
import { setAuthorization } from '../config/configureAxios';

const Login = () => {
  const Kakao = useKakao();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const loginKakao = async (authResponse) => {
    const token = authResponse.access_token;
    try {
      const { data } = await axios({ method: 'get', url: '/auth/kakao', params: { access_token: token } });
      if (data.token) {
        Cookie.set('authorization', data.token);
        setAuthorization();
        dispatch(authActions.auth());
        message.success('로그인 되었습니다');
        if (data.first) Router.push('/profile/info');
        else Router.push('/');
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

Login.getInitialProps = () => ({ onlyAnonymous: true });

export default Login;