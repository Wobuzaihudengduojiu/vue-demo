import request from '@u/request';


//添加一级类目
export function addFirstCategory(data) {

    return request({
        url:'/news/addCategory',
        method:'post',
        data
    })
}

//获取所有类目
export function getAllCategory() {

    return request({
        url:'/news/getCategory',
        method: 'get',
    })
}
