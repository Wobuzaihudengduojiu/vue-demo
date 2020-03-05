import {login} from '@/api/login'
import {setToken, setUserName, getUsername, removeToken, removeUsername} from "@u/utils";

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    token: '',
    username: getUsername() || '',
};

const getters = {
    isCollapse: state => state.isCollapse
};

const mutations = {//同步
    SET_Collapse(state) {
        state.isCollapse = !state.isCollapse;
        //只能存储字符串
        window.sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    },
    SET_TOKRN(state, value) {
        state.token = value;
    },
    SET_USERNAME(state, value) {
        state.username = value;
    },
};
const actions = {//异步
    Login({commit}, data) {
        return new Promise((resolve, reject) => {
            login(data).then((resp) => {

                let data = resp.data.data;
                commit('SET_TOKRN', data.token);
                commit('SET_USERNAME', data.username);
                setToken(data.token);
                setUserName(data.username);
                resolve(resp);
            }).catch((error) => {
                reject(error);
            })
        })
    },

    exit({commit}) {
        return new Promise(((resolve, reject) => {
            // commit('SET_TOKRN', '');
            // commit('SET_USERNAME', '');
            // removeToken();
            // removeUsername();
            resolve();
        }))


    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
