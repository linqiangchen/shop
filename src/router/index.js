import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import store from '../store'
Vue.use(VueRouter)
import axios from 'axios'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/good',
    name: 'Good',
    component: () => import( /* webpackChunkName: "about" */ '../views/good/Good.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import( /* webpackChunkName: "about" */ '../views/cart/Cart.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import( /* webpackChunkName: "about" */ '../views/mine/Mine.vue'),
    children: [{
        path: 'addressEdit',
        name: 'Edit',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/mine/Edit .vue'),
      },
      {
        path: 'AddressList',
        name: 'AddressList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../components/AddressList.vue'),
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: () => import( /* webpackChunkName: "about" */ '../views/mine/userInfo.vue'),
        children: [{
          path: 'updateName',
          name: 'updateName',
          component: () => import( /* webpackChunkName: "about" */ '../views/mine/updateName.vue'),
        },{
          path: 'updateGender',
          name: 'updateGender',
          component: () => import( /* webpackChunkName: "about" */ '../views/mine/updateGender.vue'),
        },{
          path: 'updateLocation',
          name: 'updateLocation',
          component: () => import( /* webpackChunkName: "about" */ '../views/mine/updateLocation.vue'),
        },{
          path: 'updateBirth',
          name: 'updateBirth',
          component: () => import( /* webpackChunkName: "about" */ '../views/mine/updateBirth.vue'),
        },{
          path: 'updateAvatar',
          name: 'updateAvatar',
          component: () => import( /* webpackChunkName: "about" */ '../views/mine/updateAvatar.vue'),
        },]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "about" */ '../views/account/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( /* webpackChunkName: "about" */ '../views/account/register.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {
  let login = store.state.user.login //获取登录状态
  if (login === -1) { //如果登录状态未设置，获取最新的状态
    let result = await axios.get('/api/user/isLogin')
    store.commit('user/setLogin', result.data.msg) //设置登录状态
    login = result.data.msg
  }
  if (to.name === 'login' || to.name === 'register') {
    next()
  } else {
    if (login) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router