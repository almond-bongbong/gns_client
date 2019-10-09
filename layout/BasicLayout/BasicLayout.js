import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

const HeaderStyle = styled.div`
  .header {
    .right-area {
      position: absolute;
      top: 0;
      right: 50px;
    }
  }
`;

const BasicLayout = ({ children }) => {
  const me = useSelector((state) => state.auth.me);

  return (
    <Layout className="basic-layout">
      <HeaderStyle>
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link href="/"><a href="/">홈</a></Link></Menu.Item>
          </Menu>
          <div className="right-area">
            {me ? <Link href="/profile"><a href="/profile">프로필</a></Link> : <Link href="/login"><a href="/login">로그인</a></Link>}
          </div>
        </Header>
      </HeaderStyle>
      <Content className="contents">
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
