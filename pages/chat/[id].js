import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getChatRoomById } from 'api/chatRoom';
import { useSelector } from 'react-redux';
import socketIO from 'socket.io-client';
import ChatList from 'components/ChatRoom/ChatList';
import ChatInput from 'components/ChatRoom/ChatInput';
import { apiUrl } from 'env/url';

const socket = socketIO(apiUrl);

const Id = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const [chatRoom, setChatRoom] = useState();
  const { id } = router.query;
  const nickname = useSelector((state) => state.auth?.me?.nickname);

  useEffect(() => {
    (async () => {
      const { data } = await getChatRoomById(id);
      setChatRoom(data);

      socket.on('connect', () => {
        console.log('connect socket');
      });

      socket.on('chat message', (message) => {
        const parsedMessage = JSON.parse(message);
        setMessages((prev) => prev.concat(parsedMessage));
      });
    })();
  }, [id]);

  const submitMessage = (message) => {
    const data = { nickname, message };
    socket.emit('chat message', JSON.stringify(data));
  };

  return (
    <div>
      {chatRoom && (
        <>
          <h3>{chatRoom.title}</h3>
          <ChatList messages={messages} />
          <ChatInput onSubmit={submitMessage} />
        </>
      )}
    </div>
  );
};

export default Id;
