import React from 'react';
import PropTypes from 'prop-types';

const ChatList = ({ messages }) => (
  <div>
    {messages.map((m) => (
      <div key={m.id}>
        <b>{m.nickname}</b>
        {m.message}
      </div>
    ))}
  </div>
);

ChatList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({})),
};

ChatList.defaultProps = {
  messages: [],
};

export default ChatList;
