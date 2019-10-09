import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Avatar, Col, List, Popover, Row } from 'antd';
import UserInfo from 'components/Popover/UserInfo';
import CreateChat from 'components/MessageList/CreateChat';
import BasicLayout from 'components/Layout/BasicLayout';

const Home = ({ users }) => (
  <BasicLayout>
    <Row>
      <Col span={20}>
        <CreateChat />
      </Col>
      <Col span={4}>
        <div className="area-recommend-user">
          <List
            dataSource={users}
            itemLayout="horizontal"
            renderItem={(item) => (
              <List.Item>
                <Popover placement="left" content={<UserInfo account={item} />} trigger="click">
                  <List.Item.Meta
                    avatar={<Avatar src={item.thumbnail} />}
                    title={item.nickname}
                    description=""
                  />
                </Popover>
              </List.Item>
            )}
          />
        </div>
      </Col>
    </Row>
  </BasicLayout>
);

Home.getInitialProps = async () => {
  const response = await axios.get('/user/recommend');
  return { users: response.data.users };
};

Home.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
};

Home.defaultProps = {
  users: [],
};

export default Home;
