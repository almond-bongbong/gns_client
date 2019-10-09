import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import styled from 'styled-components';

const ChatInputForm = styled.form`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px 100px 10px 10px;
  
  & > input {
 
  }
  
  & > button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 80px;
  }
`;

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage('');
  };

  return (
    <ChatInputForm onSubmit={handleSubmit}>
      <Input
        value={message}
        onChange={handleChange}
      />
      <Button htmlType="submit" type={'primary'}>전송</Button>
    </ChatInputForm>
  );
};

ChatInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChatInput;
