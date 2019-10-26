import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Navigations = styled.div`
  overflow: hidden;

  > button {
    display: block;
    float: left;
    width: 33.33333333%;
    padding: 18px;
    background-color: #f5f5f5;
    font-weight: 500;
    font-size: 16px;

    & + button {
      border-left: 1px solid #e2e2e2;
    }
  }
`;

const PanelList = styled.div``;

const Panel = styled.div`
  padding: 30px 45px;
  background-color: #fff;
`;

const ButtonArea = styled.div`
  text-align: center;
`;

function SearchTab() {
  return (
    <Container>
      <Navigations>
        <button type="button">리그 오브 레전드</button>
        <button type="button">배틀그라운드</button>
        <button type="button">오버워치</button>
      </Navigations>
      <PanelList>
        <Panel>LoL</Panel>
        <Panel>Battleground</Panel>
        <Panel>Overwatch</Panel>
      </PanelList>
      <ButtonArea>
        <button type="button">방 직접 만들기</button>
        <button type="button">매칭 시작</button>
      </ButtonArea>
    </Container>
  );
}

export default SearchTab;
