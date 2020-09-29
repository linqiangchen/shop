import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import VueLazyload from 'vue-lazyload'
import plugin from './plugin'
import { Toast } from 'vant';
Vue.use(Toast);
Vue.config.productionTip = false
Vue.use(IScrollView,IScroll)
Vue.use(plugin)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading:  '/assets/loading.jpg',
  attempt: 1
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
