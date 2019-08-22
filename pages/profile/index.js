import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLayout from '../../components/Layout/BasicLayout';
import { Card, Icon, Avatar, Dropdown, Menu, Tooltip, Tag } from 'antd';
import Router from 'next/router';
import { authActions } from '../../store/modules/auth';
import '../../resources/styles/profile.scss';
import axios from 'axios';

const { Meta } = Card;

const Profile = ({ lol }) => {
  const me = useSelector(state => state.auth.me);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>로그아웃</Menu.Item>
    </Menu>
  );

  return (
    <BasicLayout>
      {me && (
        <Card
          style={{ width: 300 }}
          actions={[
            <Tooltip placement="top" title="준비중입니다">
              <Icon type="setting" key="setting" />
            </Tooltip>,
            <Tooltip placement="top" title="프로필 수정">
              <Icon type="edit" key="edit" onClick={() => Router.push('/profile/info')} />
            </Tooltip>,
            <Dropdown overlay={menu} trigger={['click']}>
              <Icon type="ellipsis" key="ellipsis" />
            </Dropdown>,
          ]}
        >
          <Meta
            avatar={<Avatar src={me.thumbnail} />}
            title={me.nickname}
            description={
              <>
                <span>LoL : </span>
                {lol && (
                  <Tag>{lol.soloTier}</Tag>
                )}
              </>
            }
          />
        </Card>
      )}
    </BasicLayout>
  );
};

Profile.getInitialProps = async ({ store }) => {
  const prop = { isPrivate: true };
  const { id } = store.getState().auth.me;
  try {
    if (id) {
      const response = await axios.get(`/game/lol/${id}`);
      prop.lol = response.data;
    }
  } catch (e) {
    console.error(e);
  }
  console.log(prop.lol);
  return prop;
};

export default Profile;
