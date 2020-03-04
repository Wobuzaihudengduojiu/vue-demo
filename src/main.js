import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import store from "./store";

import 'element-ui/lib/theme-chalk/index.css';
import VueCompositonApi from '@vue/composition-api';


//路由守卫
router.beforeEach((to,from,next)=>{


  next();
})







//引入svg
import './icons'

if (process.env.NODE_ENV === 'development') {
  import('../mock');
}


Vue.config.productionTip = false;

Vue.use(VueCompositonApi);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
