import React, { useState } from 'react';
import BasicLayout from '../../components/Layout/BasicLayout'
import { PageHeader, Form, Button, Radio, DatePicker, Checkbox, Cascader, Input, Divider } from 'antd';
import { useInput } from '../../hooks';
import moment from 'moment';
import { useSelector } from 'react-redux';
import sigungu from '../../constants/sigungu';
import _ from 'lodash';
import fp from 'lodash/fp';
import '../../resources/styles/profile.scss';
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

const Info = () => {
  const user = useSelector(state => state.auth.user);
  const [nickname, setNickname] = useInput(user.nickname);
  const [gender, setGender] = useInput(1);
  const [birth, setBirth] = useState(moment());
  const [games, setGames] = useState([]);
  const [roleOfLol, setRoleOfLol] = useState([]);
  const [roleOfOverwatch, setRoleOfOverwatch] = useState([]);

  return (
    <BasicLayout>
      <PageHeader title="프로필" subTitle="상세한 정보를 입력할 수록 매칭 확률이 높아집니다." style={{ padding: 0 }} />
      <div className="area-form">
        <Form {...formItemLayout}>
          <Form.Item label="성별">
            <Input value={nickname} onChange={setNickname} style={{ maxWidth: 171 }} />
          </Form.Item>
          <Form.Item label="성별">
            <Radio.Group onChange={setGender} value={gender}>
              <Radio value={1}>남</Radio>
              <Radio value={2}>여</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="생년월일">
            <DatePicker onChange={d => setBirth(d)} value={birth} />
          </Form.Item>
          <Form.Item label="거주지">
            <Cascader style={{ maxWidth: 171 }} options={cityOptions} placeholder="" />
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
                <Input placeholder="소환사 명" style={{ maxWidth: 171 }} />
              </Form.Item>
              <Form.Item label="역할">
                <Checkbox.Group
                  value={roleOfLol}
                  options={[
                    { label: '탑', value: 'top' },
                    { label: '미드', value: 'mid' },
                    { label: '정글', value: 'jungle' },
                    { label: '원딜', value: 'dealer' },
                    { label: '서포터', value: 'supporter' },
                  ]}
                  onChange={setRoleOfLol}
                />
              </Form.Item>
            </div>
          )}

          {games.includes('overwatch') && (
            <div className="area-game">
              <Divider>오버워치 추가 정보</Divider>
              <Form.Item label="역할">
                <Checkbox.Group
                  value={roleOfOverwatch}
                  options={[
                    { label: '탱커', value: 'tanker' },
                    { label: '딜러', value: 'dealer' },
                    { label: '힐러', value: 'healer' },
                  ]}
                  onChange={setRoleOfOverwatch}
                />
              </Form.Item>
            </div>
          )}

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary">제출</Button>
          </Form.Item>
        </Form>
      </div>
    </BasicLayout>
  );
};

Info.getInitialProps = () => ({ isPrivate: true });

export default Info;