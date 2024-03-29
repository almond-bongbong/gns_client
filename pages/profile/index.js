import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, Dropdown, Icon, Menu, Tag, Tooltip } from 'antd';
import Router from 'next/router';
import { authActions } from 'store/modules/auth';
import axios from 'axios';

const { Meta } = Card;

const Profile = ({ lol, overwatch }) => {
  const me = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>로그아웃</Menu.Item>
    </Menu>
  );

  return me && (
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
        description={(
          <div className="game_info">
            {lol && (
              <div key="lol" className="tag">
                <span>LoL : </span>
                <Tag>{lol.soloTier}</Tag>
              </div>
            )}
            {overwatch && (
              <div key="overwatch" className="tag">
                <span>Overwatch : </span>
                <Tag>
                  {overwatch.grade}
                  :
                  {overwatch.rating}
                </Tag>
              </div>
            )}
          </div>
        )}
      />
    </Card>
  );
};

Profile.getInitialProps = async ({ store }) => {
  const prop = { isPrivate: true };
  const { id } = store.getState().auth.me || {};
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

Profile.propTypes = {
  lol: PropTypes.shape({
    soloTier: PropTypes.string,
  }),
  overwatch: PropTypes.shape({
    grade: PropTypes.string,
    rating: PropTypes.string,
  }),
};

Profile.defaultProps = {
  lol: undefined,
  overwatch: undefined,
};

export default Profile;
