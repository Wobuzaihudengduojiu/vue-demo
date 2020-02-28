//过滤特殊字符
export function filter(str) {
    var pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？]/g;
    return str.replace(pattern, "");
}

//验证用户名
export function validateEmail(value) {
    let reg = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
    return !reg.test(value) ? true : false;
}

//验证密码
export function validatePwd(value) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return !reg.test(value) ? true : false;
}

export function validateVcode(value) {
    let reg = /^[0-9a-zA-Z]+$/;
    return !reg.test(value) ? true : false;
}
