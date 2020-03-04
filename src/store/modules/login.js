import {login} from '@/api/login'

const state={
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
};

const getters={
    isCollapse:state=>state.isCollapse
};

const mutations= {//同步
    SET_Collapse(state) {
        state.isCollapse = !state.isCollapse;
        //只能存储字符串
        window.sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    }
};
const actions= {//异步
    Login(content, data) {
        return new Promise((resolve, reject) => {
            login(data).then((resp) => {
                resolve(resp);
            }).catch((error) => {
                reject(error);
            })
        })
    }
};

export default {
    namespaced:true,
    state,
    actions,
    mutations
}
