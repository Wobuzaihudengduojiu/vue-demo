const state = {
    id: '' || sessionStorage.getItem('infoId'),
    title: '' || sessionStorage.getItem('infoTitle')
};

const getters = {

    infoId: state => state.id,
    infoTitle: state => state.title,
};

const mutations = {//同步

    UPDATE_STATE_VALUE(state,params){
        for(let key in params){
            state[key]=params[key].value;
            if(params[key].session){
                sessionStorage.setItem(params[key].sessionKey,params[key].value);
            }
        }
    }
};
const actions = {//异步

};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
