import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from 'layout/Header';

const Layout = styled.div``;

const BasicLayout = ({ children }) => {
  const me = useSelector((state) => state.auth.me);

  return (
    <Layout>
      <Header currentUser={me} />
      {children}
      <footer>©2019 Created by 무제</footer>
    </Layout>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
