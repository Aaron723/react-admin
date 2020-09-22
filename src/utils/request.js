import axios from "axios"
import {getToken, getUsername} from "./cookies";
import {message} from "antd";
//创建实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
});


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) { //状态码为200
    // 对响应数据做点什么
    const data = response.data
    if (data.resCode !== 0) { // resCode不成功
        message.info(data.message); //全局拦截提示
    } else {
        return response;
    }
}, function (error) { //不为200，重定向也会触发
    console.log(error.request);
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;
