import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';

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
    <form onSubmit={handleSubmit}>
      <Input
        value={message}
        onChange={handleChange}
      />
      <Button htmlType="submit">전송</Button>
    </form>
  );
};

ChatInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChatInput;
