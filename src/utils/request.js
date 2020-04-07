import axios from 'axios';

const request=axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000,
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent

    //添加token


    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {

    const res = response.data;

    // 如果返回的状态不是200 就主动报错
    if(res.status != 200){
        return Promise.reject(res.message || 'error')
    }
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default request;
