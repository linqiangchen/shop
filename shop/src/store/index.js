import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import good from './module/good'
import cart from './module/cart'
import order from './module/order'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    good,
    cart,
    order
  }
})
