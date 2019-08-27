import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Divider, Spin, Tag } from 'antd';

const UserInfo = ({ account }) => {
  const { id, profile } = account;
  const [pending, setPending] = useState(false);
  const [lolInfo, setLolInfo] = useState();
  const [overwatchInfo, setOverwatchInfo] = useState();

  useEffect(() => {
    (async () => {
      try {
        setPending(true);
        const games = await Promise.all([
          axios.get(`/game/lol/${id}`),
          axios.get(`/game/overwatch/${id}`),
        ]);

        setLolInfo(games[0].data);
        setOverwatchInfo(games[1].data);
      } catch (e) {
        console.error(e);
      } finally {
        setPending(false);
      }
    })()
  }, []);

  return (
    <div>
      {pending ? <Spin /> : profile ? (
        <div>
          {profile.games?.map(game => (
            <div key={game}>
              <b>{game}</b>
              <span> : {profile[game]?.roles}</span>
            </div>
          ))}
          <div>
            {lolInfo && [
              <Tag>{lolInfo.soloTier}</Tag>,
            ]}
            {overwatchInfo && [
              <Tag>{overwatchInfo.grade}</Tag>,
              <Tag>{overwatchInfo.rating}</Tag>
            ]}
          </div>
        </div>
      ) : (
        <div>등록된 게임정보가 없습니다</div>
      )}
    </div>
  );
};

export default UserInfo;