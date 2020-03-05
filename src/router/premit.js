import router from "./index";
import {getToken,removeToken, removeUsername} from "@u/utils";
import store from '../store/index'

const whiteRouter = ['/login']

router.beforeEach((to, from, next) => {

    if (getToken()) {

        if(to.path==='/login'){
            removeToken();
            removeUsername();
            store.commit('logins/SET_TOKRN', '');
            store.commit('logins/SET_USERNAME','');
            next();
        }else{
            next();
        }
    } else {
        if (whiteRouter.includes(to.path)) {
            next();
        } else {
            next('/login');
        }
    }

});
