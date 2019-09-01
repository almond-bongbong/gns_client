import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import * as chatRoomApi from 'api/chatRoom';
import { useInput } from 'hooks';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const CreateChatRoom = () => {
  const [chatRoomVisible, setChatRoomVisible] = useState(false);
  const [title, setTitle] = useInput('');

  const modalOpenCreateChatRoom = () => { setChatRoomVisible(true); };
  const modalCloseCreateChatRoom = () => { setChatRoomVisible(false); };

  const createChatRoom = async () => {
    const { data } = await chatRoomApi.createChatRoom({ title });
    window.open(`/chat/${data.chatRoom.id}`, 'chatWindow', 'width=550, height=800');
  };

  return (
    <>
      <Button onClick={modalOpenCreateChatRoom}>채팅방 만들기</Button>
      <Modal
        title="채팅방 생성"
        visible={chatRoomVisible}
        onCancel={modalCloseCreateChatRoom}
        footer={[<Button key="submit" type="primary" size="large" onClick={createChatRoom}>생성</Button>]}
      >
        <Form labelCol={formItemLayout.labelCol} wrapperCol={formItemLayout.wrapperCol}>
          <Form.Item label="Step 0">
            <Input value={title} onChange={setTitle} placeholder="방제목을 입력하세요." />
          </Form.Item>
          <Form.Item label="Step 2">
            <Row>
              <Col span={8}>
                <Select defaultValue="">
                  <Option value="">티어</Option>
                  <Option value="bronze">브론즈</Option>
                </Select>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateChatRoom;
