import React from 'react';
import { SmileOutlined, CrownOutlined, TabletOutlined } from '@ant-design/icons';
export default [
  {
    path: '/',
    name: '主页',
    icon: <SmileOutlined />,
    component: '@/pages/index/index',
  },
  {
    name: '列表页',
    icon: <TabletOutlined />,
    path: '/list',
    routes: [
      {
        path: '/list/sub-page1',
        name: '列表页1',
        icon: <CrownOutlined />,
        // component: '@/pages/list/detail/index',
        component: '@/pages/list/index',
      },
      {
        path: '/list/sub-detail',
        name: '一级页面',
        icon: <CrownOutlined />,
        hideInMenu: true,
        component: '@/pages/list/detail/index',
      },
    ],
  },
]