// 公共layout
import React, { Children, useState } from 'react';
import { Button, Descriptions, Result, Avatar, Space, Statistic, Breadcrumb, Menu, Dropdown } from 'antd';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import ProLayout, { PageContainer, SettingDrawer, ProSettings } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';
import { history } from 'umi';
import { removeToken } from '@/utils/auth';

export default (props: any) => {
  // console.log(props);
  let { route, children} = props
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    layout: 'mix',
  });
  const [pathname, setPathname] = useState(route.path);

  function logout() {
    removeToken()
    setPathname('/login');
    history.push('/login');
  }

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        fixSiderbar
        // 在 layout 底部渲染一个块
        menuFooterRender={(props) => {
          return (
            <a
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              href="https://preview.pro.ant.design/dashboard/analysis"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src="https://procomponents.ant.design/favicon.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: '0 16px',
                  marginRight: 10,
                }}
              />
              {!props?.collapsed && 'Preview Pro'}
            </a>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path);
              history.push(item.path);
            }}
          >
            {dom}
          </a>
        )}
        // 自定义头右部的 render 方法
        rightContentRender={() => {
          const menu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="">个人中心</a>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <a target="_blank" onClick={logout}>
                  退出登录
                </a>
              </Menu.Item>
            </Menu>
          );
          return (
          <Dropdown overlay={menu}>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </Dropdown>
          )
        }}
        // 分割菜单
        splitMenus={true}
        {...settings}
      >
        {children}
      </ProLayout>
      <SettingDrawer
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
      />
    </div>
  );
};