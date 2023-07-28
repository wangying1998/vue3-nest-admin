import axios from 'axios';
import config from '@/config/index';
import { ElMessage } from 'element-plus';
// import { requestConfigStore } from '@/store/requestConfig.js';
// import { storeToRefs } from 'pinia';
// const { source, httpRequestList } = storeToRefs(requestConfigStore());

// let cancelToken = axios.CancelToken;
// source.value = cancelToken.source();

// 函数返回唯一的请求key
// function getRequestKey(config) {
//     let { method, url, params, data } = config;
//     return [method, url, JSON.stringify(params), JSON.stringify(data)].join(
//         '&'
//     );
// }

// 把当前请求信息添加到pendingRequest对象中
// let pendingRequest = new Map();
// function addPendingRequest(config) {
//     let requestKey = getRequestKey(config);
//     config.cancelToken =
//         config.cancelToken ||
//         new axios.CancelToken((cancel) => {
//             if (!pendingRequest.has(requestKey)) {
//                 pendingRequest.set(requestKey, cancel);
//             }
//         });
// }

// 检查是否存在重复请求，若存在则取消已发的请求：
// function removePendingRequest(config) {
//     let requestKey = getRequestKey(config);
//     if (pendingRequest.has(requestKey)) {
//         // 如果是重复的请求，则执行对应的cancel函数
//         let cancel = pendingRequest.get(requestKey);
//         cancel(requestKey);
//         // 将前一次重复的请求移除
//         pendingRequest.delete(requestKey);
//     }
// }

// 创建axios
const service = axios.create({
    baseURL: config[import.meta.env.MODE].VITE_BASE_API_URL,
    timeout: 120000,
});

//post请求头
// service.defaults.headers.post['Content-Type'] =
//     'multipart/form-data;charset=UTF-8';

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // // 检查是否存在重复请求，若存在则取消已发的请求
        // removePendingRequest(config);
        // // 把当前请求信息添加到pendingRequest对象中
        // addPendingRequest(config);
        config.url = '/api' + config.url;
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        console.log('request:', error);
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 从pendingRequest对象中移除请求
        // removePendingRequest(response.config);
        const res = response.data;
        if (res.code !== 0) {
            /** 10000 成功 */
            if (res.code === 10000) {
                return res;
            }
            /** 错误处理 */
            ElMessage({
                message: res.msg || 'Error',
                type: 'error',
                duration: 2 * 1000,
                showClose: true,
            });
            return Promise.reject(new Error(res.msg || 'Error'));
        } else {
            return res;
        }
    },
    (error) => {
        // console.log('response:', error);
        // if (axios.isCancel(error)) {
        //     /** 如果是取消请求的报错，重新赋值source */
        //     store.state.source = axios.CancelToken.source();
        //     Vue.$httpRequestList = [];
        // } else {
            ElMessage({
                message: error.message || 'Error',
                type: 'error',
                duration: 5 * 1000,
                showClose: true,
            });
        // }
        return Promise.reject(error);
    }
);

export default service;
