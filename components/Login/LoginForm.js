import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookie from 'js-cookie';
import { setAuthorization } from 'config/configureAxios';
import { authActions } from 'store/modules/auth';
import { message } from 'antd';
import Router from 'next/router';
import kakaoAuth from 'lib/kakaoAuth';

const Kakao = kakaoAuth();

const LoginFormStyle = styled.div`
  width: 200px;
  margin: 0 auto;
  text-align: center;

  ${({ fixed }) => fixed && css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
  
  h2 {
    margin-bottom: 30px;
  }
  
  button {
    display: block;
    
    + button {
      margin-top: 10px;
    }
    
    img {
      display: block;
      width: 100%;
    }
  }
`;

const LoginForm = ({ fixed }) => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const loginKakao = async (authResponse) => {
    const token = authResponse.access_token;
    try {
      const { data } = await axios({ method: 'get', url: '/auth/kakao', params: { access_token: token } });
      if (data.token) {
        Cookie.set('authorization', data.token);
        setAuthorization();
        dispatch(authActions.setMe(data.account));
        message.success('로그인 되었습니다');
        if (data.first) Router.push('/profile/info');
        else Router.replace('/');
      } else {
        message.success('문제가 발생했습니다');
      }
    } catch (e) {
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
    message.info('준비중 입니다');
    // window.open(authUrl);
  };

  return (
    <LoginFormStyle fixed={fixed}>
      <h2>로그인</h2>
      {pending ? (
        <div>login...</div>
      ) : (
        <>
          <button type="button" onClick={handleKakao}>
            <img src="/static/images/common/btn_login_kakao.png" alt="카카오 로그인" />
          </button>
          <button type="button" onClick={handleNaver}>
            <img src="/static/images/common/btn_login_naver.png" alt="네이버 로그인" />
          </button>
        </>
      )}
    </LoginFormStyle>
  );
};

LoginForm.propTypes = {
  fixed: PropTypes.bool,
};

LoginForm.defaultProps = {
  fixed: false,
};

export default LoginForm;
