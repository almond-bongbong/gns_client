import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  PageHeader,
  Radio,
  Spin,
} from 'antd';
import { useInput } from 'hooks';
import moment from 'moment';
import sigungu from 'constants/sigungu';
import _ from 'lodash';
import fp from 'lodash/fp';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'store/modules/auth';

moment.locale('ko');

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const cityOptions = fp.pipe(
  fp.map(
    fp.pipe(
      fp.toPairs,
      fp.map(([k, v]) => ({
        value: k,
        label: k,
        children: _.map(v, (s) => ({ value: s, label: s })),
      })),
    ),
  ),
  fp.flatten,
)(sigungu.data);

const Info = ({ account }) => {
  const me = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [pendingUpload, setPendingUpload] = useState(false);
  const [nickname, setNickname] = useInput(account?.nickname);
  const [thumbnail, setThumbnail] = useState(account?.thumbnail);
  const [gender, setGender] = useInput(account?.gender);
  const [birth, setBirth] = useState(account?.birth ? moment(account?.birth) : undefined);
  const [from, setFrom] = useState([account?.city, account?.sigungu]);
  const [games, setGames] = useState(account?.profile?.games || []);
  const [rolesOfLol, setRolesOfLol] = useState(account?.profile?.lol?.roles || []);
  const [rolesOfOverwatch, setRolesOfOverwatch] = useState(account?.profile?.overwatch?.roles || []);
  const [nameOfLol, setNameOfLol] = useInput(account?.profile?.lol?.name);
  const [battleTagForOverwatch, setBattleTagForOverwatch] = useInput(account?.profile?.overwatch?.battletag);

  const handleThumbnail = async (e) => {
    const form = new FormData();
    form.append('file', e.target.files[0]);

    try {
      setPendingUpload(true);
      const response = await axios.post('/file/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setThumbnail(response.data.file.url);
    } catch (error) {
      console.error(error);
    } finally {
      setPendingUpload(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setPending(true);
      await axios.post('/account/update', {
        thumbnail,
        nickname,
        gender,
        birth,
        city: from[0],
        sigungu: from[1],
        games,
        lol: { name: nameOfLol, roles: rolesOfLol },
        overwatch: { battletag: battleTagForOverwatch, roles: rolesOfOverwatch },
      });
      message.success('저장 되었습니다');
      dispatch(authActions.setMe({ ...me, nickname, gender, thumbnail }));
    } catch (e) {
      console.error(e);
      message.error('문제가 발생했습니다');
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <PageHeader title="프로필" subTitle="상세한 정보를 입력할 수록 매칭 확률이 높아집니다." style={{ padding: 0 }} />
      <div className="thumbnail-wrap">
        <input type="file" id="thumbnail" accept="image/*" onChange={handleThumbnail} />
        <label htmlFor="thumbnail">
          {pendingUpload ? <Spin /> : <Avatar size={64} icon="user" src={thumbnail} />}
        </label>
      </div>
      <div className="area-form">
        <Form {...formItemLayout}>
          <Form.Item label="닉네임">
            <Input value={nickname} onChange={setNickname} style={{ maxWidth: 171 }} />
          </Form.Item>
          <Form.Item label="성별">
            <Radio.Group onChange={setGender} value={gender}>
              <Radio value={1}>남</Radio>
              <Radio value={2}>여</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="생년월일">
            <DatePicker onChange={(d) => setBirth(d)} value={birth} placeholder="생년월일" />
          </Form.Item>
          <Form.Item label="거주지">
            <Cascader style={{ maxWidth: 171 }} options={cityOptions} placeholder="" value={from} onChange={(f) => setFrom(f)} />
          </Form.Item>
          <Form.Item label="플레이 중인 게임">
            <Checkbox.Group
              value={games}
              options={[
                { label: '리그 오브 레전드', value: 'lol' },
                { label: '오버워치', value: 'overwatch' },
                { label: '배틀그라운드', value: 'battleground' },
              ]}
              onChange={setGames}
            />
          </Form.Item>

          {games.includes('lol') && (
            <div className="area-game">
              <Divider>리그 오브 레전드 추가 정보</Divider>
              <Form.Item label="소환사 명">
                <Input placeholder="소환사 명" onChange={setNameOfLol} value={nameOfLol} style={{ maxWidth: 171 }} />
              </Form.Item>
              <Form.Item label="역할">
                <Checkbox.Group
                  value={rolesOfLol}
                  options={[
                    { label: '탑', value: 'top' },
                    { label: '미드', value: 'mid' },
                    { label: '정글', value: 'jungle' },
                    { label: '원딜', value: 'dealer' },
                    { label: '서포터', value: 'supporter' },
                  ]}
                  onChange={setRolesOfLol}
                />
              </Form.Item>
            </div>
          )}

          {games.includes('overwatch') && (
            <div className="area-game">
              <Divider>오버워치 추가 정보</Divider>
              <Form.Item label="이름#배틀태그">
                <Input placeholder="홍길동#1234" onChange={setBattleTagForOverwatch} value={battleTagForOverwatch} style={{ maxWidth: 171 }} />
              </Form.Item>
              <Form.Item label="역할">
                <Checkbox.Group
                  value={rolesOfOverwatch}
                  options={[
                    { label: '탱커', value: 'tanker' },
                    { label: '딜러', value: 'dealer' },
                    { label: '힐러', value: 'healer' },
                  ]}
                  onChange={setRolesOfOverwatch}
                />
              </Form.Item>
            </div>
          )}

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" onClick={handleSubmit} loading={pending}>저장</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

Info.getInitialProps = async ({ store }) => {
  const myId = store.getState().auth.me?.id;
  const prop = { isPrivate: true };
  try {
    if (myId) {
      const { data } = await axios.get('/account/update');
      prop.account = data;
    }
  } catch (e) {
    console.error(e);
  }
  return prop;
};

Info.propTypes = {
  account: PropTypes.shape({}),
};

Info.defaultProps = {
  account: undefined,
};

export default Info;
