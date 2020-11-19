import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';

export default defineConfig({
  
  locale: {
    // enable: true, // default false
    default: 'zh-CN', // default zh-CN
    baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
  }, 
  theme: {
    "primary-color": "#16D1A4",
  },
  proxy,
  routes: [
    { path: '/login', component: '@/pages/login' },
    {
      exact: false, 
      path: '/', 
      component: '@/layouts/index',
      wrappers: [
        '@/wrappers/auth'
      ],
      routes
    }
  ],
});