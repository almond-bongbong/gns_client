import React from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import '../../resources/styles/layout.scss';
import { useSelector } from 'react-redux';

const { Header, Content, Footer } = Layout;

const BasicLayout = ({ children }) => {
  const user = useSelector(state => state.auth.user);

  return (
    <Layout className="basic-layout">
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
        <div className="right-area">
          {user
            ? <Link href="/profile"><a href="/profile">프로필</a></Link>
            : <Link href="/login"><a href="/login">로그인</a></Link>
          }
        </div>
      </Header>
      <Content style={{ padding: '50px 50px 0' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

export default BasicLayout;