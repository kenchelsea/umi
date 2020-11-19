import React, { useState } from 'react';
import { message, Card, Checkbox } from 'antd';

import { connect, history } from 'umi';
import styles from './index.less';
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
interface xxObj {
  [key: string]: any
}
const contentList: xxObj = {
  // 账号登录
  account: <>
    <div className="form-label">登录账号</div>
    <ProFormText
      fieldProps={{
        size: 'large'
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
    <div className="form-label">登录密码</div>
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
    <div className="form-label">手机号</div>
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
    <div className="form-label">验证码</div>
    <div className={styles['phone-captcha']} >
      <ProFormCaptcha
        fieldProps={{
          size: 'large',
          className: 'phone-captcha-input',
        }}
        captchaProps={{
          className: 'phone-captcha-code',
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
    </div>
  </>,
};

const LoginLayout = (p: any) => {
  console.log(p);

  let { dispatch, token } = p
  // 登录按钮回调
  async function handleFinish(values: object) {
    await dispatch({
      type: 'user/login',
      payload: {
        ...values,
        loginType: tabIndex === 'account' ? 1 : 2,
        isAuto
      },
    })
    message.success('登录成功！');
    // history.push('/')

  }
  // 是否自动登录
  function autoLogin(e: any) {
    setIsAuto(e.target.checked)
  }
  const [tabIndex, setTabIndex] = useState('account')
  const [isAuto, setIsAuto] = useState(false)
  return (
    <div id="login-page" >
      <div className="card-box" >
        <ProForm
          className="login-form"
          initialValues={{
            username: 'admin',
            password: 'dst123456'
          }}
          onFinish={handleFinish}
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
          <h1 className="title">欢迎来到B端租车管理后台！</h1>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={tabIndex}
            bordered={false}
            onTabChange={key => setTabIndex(key)}
          >
            {contentList[tabIndex]}
          </Card>
        </ProForm>
        <div className="tools">
          <Checkbox onChange={autoLogin} ><span className='color-green'>下次自动登录</span></Checkbox>
          <div className='right'>
            忘记密码？
            <a onClick={() => { history.push('/register') }}>去注册</a>
          </div>
        </div>
      </div>
    </div>
  );
};


export default connect(({ user }: any) => ({
  user
}))(LoginLayout);

// export default LoginLayout