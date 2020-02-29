import request from '@u/request';

//获取验证码
export function getMsg(data) {
    return request({
        url:'/user/getUser',
        method:'post',
        data,
    })
}

//获取用户角色




//登录
export function login(data) {
    return request({
        url:'/user/login',
        method:'post',
        data,
    })
}

//注册
export function register(data) {
    return request({
        url:'/user/register',
        method:'post',
        data,
    })
}
