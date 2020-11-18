export default{
  '/dst-apis': {
    // 2.0铁牛
    'target': 'http://172.16.8.35:8300', // dev环境
    'changeOrigin': true,
    'pathRewrite': { 
      '^/dst-apis' : '' 
    },
  },
}