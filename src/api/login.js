import request from '@u/request';

//获取验证码
export function getMsg() {
    return request({
        url:'/user/getUser',
        method:'post',
    })
}
//获取用户角色

//登录

//注册
