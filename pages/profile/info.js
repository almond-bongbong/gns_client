import React, { useState } from 'react';
import BasicLayout from '../../components/Layout/BasicLayout'
import { PageHeader, Form, Button, Radio, DatePicker, Checkbox, Cascader, Input, Divider, message } from 'antd';
import { useInput } from '../../hooks';
import moment from 'moment';
import sigungu from '../../constants/sigungu';
import _ from 'lodash';
import fp from 'lodash/fp';
import axios from 'axios';
import '../../resources/styles/profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/modules/auth';
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
      fp.map(([k, v]) =>
        ({
          value: k,
          label: k,
          children: _.map(v, s =>
            ({ value: s, label: s }))
        })
      ),
    )
  ),
  fp.flatten,
)(sigungu.data);

const Info = ({ profile }) => {
  const me = useSelector(state => state.auth.me);
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [nickname, setNickname] = useInput(profile?.account.nickname);
  const [gender, setGender] = useInput(profile?.account.gender);
  const [birth, setBirth] = useState(profile?.account?.birth ? moment(profile?.account?.birth) : undefined);
  const [from, setFrom] = useState([profile?.account?.city, profile?.account?.sigungu]);
  const [games, setGames] = useState(profile?.info?.games || []);
  const [rolesOfLol, setRolesOfLol] = useState(profile?.info?.lol?.roles || []);
  const [rolesOfOverwatch, setRolesOfOverwatch] = useState(profile?.info?.overwatch?.roles || []);
  const [nameOfLol, setNameOfLol] = useInput(profile?.info?.lol?.name);

  const handleSubmit = async () => {
    try {
      setPending(true);
      await axios.post(`/account/update`, {
        nickname,
        gender,
        birth,
        city: from[0],
        sigungu: from[1],
        games,
        lol: { name: nameOfLol, roles: rolesOfLol },
        overwatch: { roles: rolesOfOverwatch },
      });
      message.success('저장 되었습니다');
      dispatch(authActions.setMe({ ...me, nickname, gender }));
    } catch (e) {
      console.error(e);
      message.error('문제가 발생했습니다');
    } finally {
      setPending(false);
    }
  };

  return (
    <BasicLayout>
      <PageHeader title="프로필" subTitle="상세한 정보를 입력할 수록 매칭 확률이 높아집니다." style={{ padding: 0 }} />
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
            <DatePicker onChange={d => setBirth(d)} value={birth} placeholder="생년월일" />
          </Form.Item>
          <Form.Item label="거주지">
            <Cascader style={{ maxWidth: 171 }} options={cityOptions} placeholder="" value={from} onChange={f => setFrom(f)} />
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
    </BasicLayout>
  );
};

Info.getInitialProps = async ({ store }) => {
  const myId = store.getState().auth.me?.id;
  const prop = { isPrivate: true };
  try {
    if (myId) {
      const { data } = await axios.get(`/account/update`);
      prop.profile = data;
    }
  } catch (e) {
    console.error(e);
  }
  return prop;
};

export default Info;
