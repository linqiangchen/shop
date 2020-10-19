export default {
    path: '/',
    name: 'Home',
    component:() => import( /* webpackChunkName: "about" */ '../../views/Home.vue'),
    children: [{
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "about" */ '../../views/home/home.vue'),
      meta: { 
          icon:'home',
          title:'系统首页'
       },
       children:[
        {
          path:'/403',
          name:'403',
          component:()=>import('../../views/error/403.vue')
        },
       ]
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import( /* webpackChunkName: "about" */ '../../views/goods/goods.vue'),
      meta: { 
        icon:'shop',
        title:'商品管理'
     }
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import( /* webpackChunkName: "about" */ '../../views/comment/comment.vue'),
      meta: { 
        icon:'message',
        title:'评价管理'
     }
    },
    {
      path: '/orderManger',
      name: 'orderManger',
      component:{
        render: h => <router-view/>
      },
      meta: { 
        icon:'shopping-cart',
        title:'订单管理',
        hasSub:true,
     },
      children:[{
        path: 'order',
        name: 'order',
        component: () => import( /* webpackChunkName: "about" */ '../../views/order/order.vue'),
        meta: { 
            icon:'home',
            title:'商品订单'
         },
      },
      {
        path: 'saleOut',
        name: 'saleOut',
        component: () => import( /* webpackChunkName: "about" */ '../../views/order/saleOut.vue'),
        meta: { 
            icon:'home',
            title:'售后管理'
         },
      }
    ]
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import( /* webpackChunkName: "about" */ '../../views/activity/activity.vue'),
      meta: { 
        icon:'project',
        title:'活动管理'
     },
    },
    {
      path: '/platform',
      name: 'platform',
      component:{
        render: h => <router-view/>
      },
      meta: { 
        icon:'team',
        title:'平台管理',
        hasSub:true,
     },
      children:[{
        path: 'classify',
        name: 'classify',
        component: () => import( /* webpackChunkName: "about" */ '../../views/platform/classify.vue'),
        meta: { 
            icon:'home',
            title:'分类设置'
         },
      },
      {
        path: 'banner',
        name: 'banner',
        component: () => import( /* webpackChunkName: "about" */ '../../views/platform/banner.vue'),
        meta: { 
            icon:'home',
            title:'焦点图'
         },
      },
      {
        path: 'template',
        name: 'template',
        component: () => import( /* webpackChunkName: "about" */ '../../views/platform/template.vue'),
        meta: { 
            icon:'home',
            title:'运费模板'
         },
      },
    ]
    },
    {
      path: '/vip',
      name: 'vip',
      component: () => import( /* webpackChunkName: "about" */ '../../views/vip/vip.vue'),
      meta: { 
        icon:'crown',
        title:'会员管理'
     },
    },
    {
      path: '/data',
      name: 'data',
      component: () => import( /* webpackChunkName: "about" */ '../../views/data/data.vue'),
      meta: { 
        icon:'pie-chart',
        title:'数据统计'
     },
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: '/auth/showAccount',
      component:{
        render: h => <router-view/>
      },
      meta: { 
        icon:'unlock',
        title:'权限管理'
     },
     children:[{
         path:'addAccount',
         name:'addAccount',
         component: () => import( /* webpackChunkName: "about" */ '../../views/auth/addAccount.vue'),
         meta: { 
          icon:'unlock',
          title:'添加管理员'
       },
     },{
        path:'showAccount',
        name:'showAccount',
        component: () => import( /* webpackChunkName: "about" */ '../../views/auth/showAccount.vue'),
        meta: { 
          icon:'unlock',
          title:'管理员'
       },
    }]
    },

  ]
  }