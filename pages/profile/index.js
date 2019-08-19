import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLayout from '../../components/Layout/BasicLayout';
import { Card, Icon, Avatar, Dropdown, Menu, Tooltip } from 'antd';
import Router from 'next/router';
import { authActions } from '../../store/modules/auth';
import '../../resources/styles/profile.scss';

const { Meta } = Card;

const Profile = () => {
  const user = useSelector(state => state.auth.user);
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
      {user && (
        <Card
          style={{ width: 300 }}
          actions={[
            <Tooltip placement="top" title="준비중입니다">
              <Icon type="setting" key="setting" />
            </Tooltip>,
            <Tooltip placement="top" title="프로필 수정">
              <Icon type="edit" key="edit" onClick={() => Router.push('/profile/info')} />
            </Tooltip>,
            <Dropdown overlay={menu}>
              <Icon type="ellipsis" key="ellipsis" />
            </Dropdown>,
          ]}
        >
          <Meta
            avatar={<Avatar src={user.thumbnail} />}
            title={user.nickname}
            description="This is the description"
          />
        </Card>
      )}
    </BasicLayout>
  );
};

Profile.getInitialProps = () => ({ isPrivate: true });

export default Profile;
