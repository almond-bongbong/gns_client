import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Icon } from 'antd';
import '../../resources/styles/layout.scss';
import { useSelector } from 'react-redux';

const { Header, Content, Footer } = Layout;

const BasicLayout = ({ children }) => {
  const me = useSelector(state => state.auth.me);

  return (
    <Layout className="basic-layout">
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
          {me
            ? <Link href="/profile"><a href="/profile">프로필</a></Link>
            : <Link href="/login"><a href="/login">로그인</a></Link>
          }
        </div>
      </Header>
      <Content className="contents">
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

export default BasicLayout;