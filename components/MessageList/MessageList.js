import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MessageContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 50px;
  left: 0;
`;

const Message = styled.div`
  padding: 10px;
  
  & > b {
    display: block;
    margin-bottom: 3px;
  }
  
  & > p {
    color: #666;
    margin: 0;
  }
`;

const MessageList = ({ messages, messageContainerRef }) => (
  <MessageContainer ref={messageContainerRef}>
    {messages.map((m) => (
      <Message key={m.id}>
        <b>{m.user}</b>
        <p>{m.text}</p>
      </Message>
    ))}
  </MessageContainer>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({})),
  messageContainerRef: PropTypes.shape({}).isRequired,
};

MessageList.defaultProps = {
  messages: [],
};

export default MessageList;
