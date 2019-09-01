import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Spin, Tag } from 'antd';

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
    })();
  }, [id]);

  return (
    <div>
      {pending && <Spin />}
      {!pending && profile ? (
        <div>
          {profile.games?.map((game) => (
            <div key={game}>
              <b>{game}</b>
              <span>{profile[game]?.roles}</span>
            </div>
          ))}
          <div>
            {lolInfo && [
              <Tag>{lolInfo.soloTier}</Tag>,
            ]}
            {overwatchInfo && [
              <Tag>{overwatchInfo.grade}</Tag>,
              <Tag>{overwatchInfo.rating}</Tag>,
            ]}
          </div>
        </div>
      ) : (
        <div>등록된 게임정보가 없습니다</div>
      )}
    </div>
  );
};

UserInfo.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number,
    profile: PropTypes.shape({
      games: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

UserInfo.defaultProps = {
  account: undefined,
};

export default UserInfo;
