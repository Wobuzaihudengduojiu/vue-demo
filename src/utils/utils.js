import cookie from 'js-cookie';

const adminTkoen = 'token'

export function getToken() {
    return cookie.get(adminTkoen);
}

export function setToken(val) {
    cookie.set(adminTkoen, val);
}

export function removeToken() {
    cookie.remove(adminTkoen);
}


export function setUserName(val) {
    cookie.set('username', val);
}

export function getUsername() {
    return cookie.get('username');
}

export function removeUsername() {
    cookie.remove('username');
}

