import axios from 'axios'

// 将所有请求指向本地mock服务器
axios.defaults.baseURL = 'http://localhost:9527';
axios.defaults.withCredentials = true; // 允许携带cookie

//添加请求拦截器
axios.interceptors.request.use(function(config) {
  //在发送请求之前做某事
  return config;
}, function(error) {
  //请求错误时做些事
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function(response) {
  //对响应数据做些事
   return response.data;
}, function(error) {
  //请求错误时做些事
  return Promise.reject(error)
})

export default function(url, data={}, options={}) {
  options.method = options.method || 'post';
  options.url = url;

  if (options.method === 'get') {
    options.params = data;
  } else {
    options.data = data;
  }

  return axios(options)
}