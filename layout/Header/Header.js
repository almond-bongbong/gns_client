import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import logo from 'static/images/common/logo.png';
import styled from 'styled-components';

const HeaderWrapper = styled.div``;

const HeaderContent = styled.div`
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 19px 0;
`;

const Logo = styled.h1``;

const ButtonArea = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  color: #262626;
  font-weight: 500;
  font-size: 15px;
  transform: translateY(-50%);
  
  & > * + * {
    margin-left: 30px;
  }
`;

function Header({ currentUser }) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo>
          <Link href="/">
            <a href="/">
              <img src={logo} alt="로고" />
            </a>
          </Link>
        </Logo>
        <ButtonArea>
          <button onClick={() => alert('준비중입니다.')} type="button">
            커뮤니티
          </button>
          {currentUser ? (
            <Link href="/profile">
              <a href="/profile">프로필</a>
            </Link>
          ) : (
            <Link href="/login">
              <a href="/login">로그인</a>
            </Link>
          )}
        </ButtonArea>
      </HeaderContent>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  currentUser: PropTypes.shape({}),
};

Header.defaultProps = {
  currentUser: undefined,
};

export default Header;
