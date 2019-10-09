import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { getChatById } from 'api/chat';
import socketIO from 'socket.io-client';
import MessageList from 'components/MessageList';
import ChatInput from 'components/ChatInput';
import { apiUrl } from 'env/url';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

let socket;
const MAX_MESSAGE_LENGTH = 30;

const ChatInfoBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 10px;
  background-color: skyblue;
  color: #fff;
`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const [chat, setChat] = useState();
  const me = useSelector((state) => state.auth.me);
  const { id } = router.query;
  const messageContainerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { data } = await getChatById(id);
      setChat(data);
      setMessages(data.messages.reverse());
    })();
  }, [id]);

  useEffect(() => {
    socket = socketIO(apiUrl);

    socket.emit('join', { id });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [id]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prev) => (prev.some((m) => m.id === message.timestamp) ? prev : prev.concat(message)));
    });
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo(0, messageContainerRef.current.scrollHeight);
    }

    if (messages.length > MAX_MESSAGE_LENGTH) {
      setMessages((prev) => prev.slice(prev.length - MAX_MESSAGE_LENGTH, prev.length));
    }
  }, [messages]);

  const sandMessage = (message) => {
    const timestamp = Date.now();

    socket.emit('sendMessage', { message, timestamp });
    setMessages((prev) => prev.concat({
      id: timestamp,
      user: me.nickname,
      text: message,
    }));
  };

  return (
    <div>
      {chat && (
        <>
          <ChatInfoBar>{chat.title}</ChatInfoBar>
          <MessageList messages={messages} messageContainerRef={messageContainerRef} />
          <ChatInput onSubmit={sandMessage} />
        </>
      )}
    </div>
  );
};

export default Chat;
