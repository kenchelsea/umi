import { extend } from 'umi-request'
import { notification } from 'antd';



/**
 * 异常处理程序
 */
const errorHandler = error => {
  if (error && error.code != 200) {
    notification.error({
      description: `请求错误 ${error.code}: ${error.msg}`,
      message: error.status,
    });
    throw error;
  } else if (!error) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
};

/**
 * 配置request请求时的默认参数
 */
let request = extend({
  prefix: process.env.BASE_API, // api的base_url
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});


// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
    let token = window.localStorage.getItem('token') || '';
    const headers = {
      token,
    };
    return {
      url: url,
      options: {
        ...options,
        headers
      },
    };
  },
);

// clone response in response interceptor
request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  if (data && data.code === 401) {
    location.href = '/user/login ';
  }
  if (data && data.code !== 0) {
    throw data
  }
  return response;
})

export default request