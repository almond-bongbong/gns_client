import React from 'react';
import styled from 'styled-components';
import BasicLayout from 'layout/BasicLayout';
import SearchTab from 'components/SearchTab';

const BannerArea = styled.article`
  height: 315px;
  background-color: #15b895;
`;

const Content = styled.div`
  width: 1000px;
  margin: 0 auto;
  background-color: #f7f7f7;
`;

const SearchArea = styled.div`
  margin-top: -160px;
  border: 1px solid #ebf0f0;
  background-color: #fff;
`;

const Home = () => (
  <BasicLayout>
    <BannerArea />
    <Content>
      <SearchArea>
        <SearchTab />
      </SearchArea>
    </Content>
  </BasicLayout>
);

export default Home;
