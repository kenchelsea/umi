import React, { useState } from 'react';
import { message, Card } from 'antd';
import { connect, history } from 'umi';
import './index.less';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { MobileTwoTone, MailTwoTone } from '@ant-design/icons';
const tabListNoTitle = [
  {
    key: 'account',
    tab: '账号登录',
  },
  {
    key: 'phone',
    tab: '手机登录',
  },
];

const contentList = {
  // 账号登录
  account: <>
    <ProFormText
      fieldProps={{
        size: 'large',
      }}
      name="username"
      placeholder="请输入账号"
      rules={[
        {
          required: true,
          message: '请输入账号!',
        },
        // {
        //   pattern: /^1\d{10}$/,
        //   message: '不合法的账号格式!',
        // },
      ]}
    />
    <ProFormText.Password
      fieldProps={{
        size: 'large',
      }}
      name="password"
      rules={[
        {
          required: true,
          message: '请输入密码！',
        },
      ]}
      placeholder="请输入密码"
    />
  </>,
  phone: <>
    <ProFormText
      fieldProps={{
        size: 'large',
      }}
      name="phone"
      placeholder="请输入手机号"
      rules={[
        {
          required: true,
          message: '请输入手机号!',
        },
        {
          pattern: /^1\d{10}$/,
          message: '不合法的手机号格式!',
        },
      ]}
    />
    <ProFormCaptcha
      fieldProps={{
        size: 'large',
      }}
      captchaProps={{
        size: 'large',
      }}
      name="captcha"
      rules={[
        {
          required: true,
          message: '请输入验证码！',
        },
      ]}
      placeholder="请输入验证码"
      onGetCaptcha={async () => {
        // await waitTime(1000);
        message.success('验证码发送成功!');
      }}
    />
  </>,
};

const LoginLayout = ({dispatch}) => {
  // console.log(props);
  // let { dispatch } = props
  function reqLogin(params){
    dispatch({
      type: 'user/login',
      payload: {
        ...params,
        loginType: tabIndex === 'account' ? 1 : 2,
      },
    })
  }
  const [tabIndex, setTabIndex] = useState('account')
  return (
    <div id="login-page" >
      <ProForm
        className="login-form"
        onFinish={async (values) => {
          await reqLogin(values);
          console.log('提交成功！');
          
          message.success('提交成功！');
          // history.push('/')
        }}
        submitter={{
          searchConfig: {
            submitText: '登录',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
      >
        <h1 className="title">
          <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          Ant Design
        </h1>
        
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={tabIndex}
          onTabChange={key => setTabIndex(key)}
        >
          {contentList[tabIndex]}
        </Card>

      </ProForm>
    </div>
  );
};


export default connect(({ user }) => ({
  ...user
}))(LoginLayout);

// export default LoginLayout