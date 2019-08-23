import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLayout from '../../components/Layout/BasicLayout';
import { Card, Icon, Avatar, Dropdown, Menu, Tooltip, Tag } from 'antd';
import Router from 'next/router';
import { authActions } from '../../store/modules/auth';
import '../../resources/styles/profile.scss';
import axios from 'axios';

const { Meta } = Card;

const Profile = ({ lol, overwatch }) => {
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
          style={{ width: 400 }}
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
              <div className="game_info">
                {lol && (
                  <div className="tag">
                    <span>LoL : </span>
                    <Tag>{lol.soloTier}</Tag>
                  </div>
                )}
                {overwatch && (
                  <div className="tag">
                    <span>Overwatch : </span>
                    <Tag>{overwatch.grade} : {overwatch.rating}</Tag>
                  </div>
                )}
              </div>
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
      const games = await Promise.all([
        axios.get(`/game/lol/${id}`),
        axios.get(`/game/overwatch/${id}`),
      ]);

      prop.lol = games[0].data;
      prop.overwatch = games[1].data;
    }
  } catch (e) {
    console.error(e);
  }
  return prop;
};

export default Profile;
