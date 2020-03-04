import Vue from "vue";
import Vuex from "vuex";
import logins from './modules/login'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        logins,
    }
});
