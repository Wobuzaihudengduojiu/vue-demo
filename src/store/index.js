import Vue from "vue";
import Vuex from "vuex";
import logins from './modules/login';
import news from './modules/news';
import categoryInfo from "./modules/categoryInfo";


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        logins,
        news,
        categoryInfo
    }
});
