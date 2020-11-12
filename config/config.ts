import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  
  locale: {
    // enable: true, // default false
    default: 'zh-CN', // default zh-CN
    baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
  },
  routes: [
    { path: '/login', component: '@/pages/login' },
    // ...routes
    {
      exact: false, 
      path: '/', 
      component: '@/layouts/index',
      // routes: [
      //   { path: '/', component: '@/pages/index/index', exact: true },
      //   { path: '/list', component: '@/pages/list/index', exact: true, flatMenu: false },
      // ]
      routes
    }
  ],
});