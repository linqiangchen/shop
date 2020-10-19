<template>
  <div class="home">
    <a-layout>
      <a-layout-header class="header j-s-a">
        <div class="logo j-s-a">
          <a-icon type="shopping-cart" />
          <p>电商管理系统</p>
        </div>
        <a-menu
          theme="dark"
          mode="horizontal"
          :selectable="false"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item> <a-icon type="user" /></a-menu-item>
          <a-menu-item>{{info.name}}</a-menu-item>
          <a-menu-item> <a-icon type="poweroff" @click="logout" /> </a-menu-item>
        </a-menu> </a-layout-header
    ></a-layout>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" collapsible>
        <a-menu theme="dark" :default-selected-keys="select" 
        :defaultOpenKeys="OpenKeys"
        mode="inline">
        <template v-for="item in menuList">
            <a-sub-menu   :key="item.name" v-if="item.meta.hasSub">
            <span slot="title"><a-icon :type="item.meta.icon" /><span>{{item.meta.title}}</span></span>
            <a-menu-item v-for="sub in item.children" :key="sub.name" @click="link(sub.name)"> {{sub.meta.title}}</a-menu-item>
          </a-sub-menu>
          <a-menu-item  :key="item.name" v-else @click="link(item.name)">
            <a-icon :type="item.meta.icon" />
            <span>{{item.meta.title}}</span>
          </a-menu-item>
        </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0" >
            <a-breadcrumb-item v-for="(item , index) in pathList" :key="index">{{item}}</a-breadcrumb-item>
          </a-breadcrumb>
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          >
          <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
// @ is an alias to /src
import Vue from "vue";
import axios from 'axios'
import {mapState} from 'vuex'
import { Layout, Menu, Icon, Breadcrumb } from "ant-design-vue";
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Breadcrumb);
import main from '../router/module/mainRouter'

export default {
  name: "Home",
  data() {
    return {
      collapsed: false,
      select:[],
      OpenKeys:[],
      main
    };
  },
  computed: {
    ...mapState({
      info:state=>state.account.info
    }),
    pathList(){
      return this.$route.matched.map(item => item.meta.title)
    },
    menuList(){
      if(this.info.isAdmin){
        return this.main.children
      }
      let arr = []
      this.info.auth.forEach(item => {
          this.main.children.forEach(route =>{
            if(route.name === item){
              arr.push(route)
            }else if(route.meta.hasSub){
              let result = route.children.find(sub => sub.name === item)
              let result2 = arr.find(sub => sub.name === route.name)
              let _router = JSON.parse(JSON.stringify(route))
              _router.children = [result]
              if(result && !result2){
                arr.push(_router)
              }else if(result && result2){
                result2.children.push(result)
              }
            }
          })
      })
      
      return arr    
    }
  },
  created() {
    this.$store.dispatch('account/getInfo')
    if(this.$route.matched.length >2 ){
      this.OpenKeys = [this.$route.matched[1].name] 
    }
    this.select = [this.$route.name]
  },
  methods: {
    handleOpen(key, keyPath) {
      
    },
    handleClose(key, keyPath) {
   
    },
    link(name){
      if(this.$route.name === name){
        return
      }
      this.$router.push({name})
    },
    logout(){
          
          axios.get('/os/account/logout').then((res)=>{
              
              if(res.data.code === 0){
                  this.$router.replace('/login')
              }
          })
      },
  },
};
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  text-align: left;
}
.header {
  font-size: 25px;
  color: #fff;
  li {
    font-size: 25px;
    color: #fff;
  }
  i {
    font-size: 25px;
    color: #fff;
  }
}
.logo {
  align-items: center;
  color: #fff;
  p {
    margin: 0;
    margin-left: 20px;
  }
}
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>