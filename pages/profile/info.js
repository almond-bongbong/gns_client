import React, { useState } from 'react';
import BasicLayout from '../../components/Layout/BasicLayout'
import { PageHeader, Form, Button, Radio, DatePicker, Checkbox, Cascader } from 'antd';
import { useInput } from '../../hooks';
import moment from 'moment';
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
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
      },
    ],
  },
];

const Info = () => {
  const [gender, setGender] = useInput(1);
  const [birth, setBirth] = useState(moment());

  return (
    <BasicLayout>
      <PageHeader title="프로필" subTitle="정보를 입력할 수록 매칭 확률이 높아집니다." />
      <Form {...formItemLayout}>
        <Form.Item label="성별">
          <Radio.Group onChange={setGender} value={gender}>
            <Radio value={1}>남</Radio>
            <Radio value={2}>여</Radio>
            <Radio value={3}>그외</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="생년월일">
          <DatePicker onChange={d => setBirth(d)} value={birth} />
        </Form.Item>
        <Form.Item label="거주지">
          <Cascader style={{ maxWidth: 171 }} options={options} placeholder="" />
        </Form.Item>
        <Form.Item label="플레이 중인 게임">
          <Checkbox.Group
            options={[
              { label: '리그 오브 레전드', value: 'lol' },
              { label: '오버워치', value: 'overwatch' },
              { label: '배틀그라운드', value: 'battleground' },
            ]}
            // defaultValue={['Apple']}
            // onChange={onChange}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary">제출</Button>
        </Form.Item>
      </Form>
    </BasicLayout>
  );
};

Info.getInitialProps = () => ({ isPrivate: true });

export default Info;