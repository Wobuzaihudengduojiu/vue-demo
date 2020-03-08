import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import store from "./store";

import 'element-ui/lib/theme-chalk/index.css';
import VueCompositonApi from '@vue/composition-api';

//定义全局组件
import './icons'

// //定义全局方法并注入
// import global from '@u/global';

//路由守卫
import '@/router/premit';

//mook
if (process.env.NODE_ENV === 'development') {
    import('../mock');
}

Vue.config.productionTip = false;

// Vue.use(global);
Vue.use(VueCompositonApi);
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
