import axios from 'axios';

axios.defaults.baseURL = 'https://163api.qijieya.cn/';
axios.defaults.timeout = 10000;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = (data) => {
  const params = new URLSearchParams();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      params.append(key, data[key]);
    }
  }
  return params.toString();
};
axios.defaults.withCredentials = true; // 跨域

/**
 * 设置响应拦截器
 */
axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data.result; // 直接返回响应数据
  },
  (error) => {
    const { response } = error;

    if (response) {
      const { data } = response;
      if (data) {
        console.error('API Error:', data.message || '未知错误');

        // 根据错误码处理
        switch (data.code) {
          case 503:
            // 处理503错误
            break;
          case 301:
            // 处理301重定向
            break;
          default:
            break;
        }
      } else {
        console.error('请求超时，请稍后重试');
      }
    } else {
      if (!window.navigator.onLine) {
        console.error('网络连接已断开');
        // 跳转到断网页面
        return;
      }
      console.error('服务器错误');
    }

    return Promise.reject(error);
  }
);

export default axios;
