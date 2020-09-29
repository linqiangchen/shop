<template>
<div id="app">

   
    
    <div id="nav">
        <router-link :to="item.path" v-for="item in nav" :key="item.id" @click="showTitle(item.id)"><i class="iconfont " :class="item.icon"></i><span>{{item.con}}</span></router-link> 
        
    </div>
    <router-view />
</div>
</template>
<script>
export default {
  name:'App',
  created() {
  
  },
  data(){
    return {
      title:'商城首页',
      nav:[
        {
          id:0,
          title:'商城首页',
          icon:'iconyemian',
          con:'首页',
          path:'/'
        },
        {
          id:1,
          title:'全部商品',
          icon:'iconshangpin2',
          con:'商品',
          path:'/good'
        },
        {
          id:2,
          title:'购物车',
          icon:'icongouwuchekong',
          con:'购物车',
          path:'/cart'
        },
        {
          id:3,
          title:'会员中心',
          icon:'iconwodedangxuan1',
          con:'我的',
          path:'/mine'
        },
      ]
    }
  },
  methods: {
    showTitle(id){
      this.title = this,nav[id].title
    }
  },
}
</script>
<style lang="scss">
.sub{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 110;
  
      .header{
          p{
              padding: 0 15px;
              text-align: left;
              i{
                  font-size: 16px;
              }
          }
      }
}
.page {
  position: absolute;
  top: 0px;
  bottom:50px;
  left: 0;
  right: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
.header{
  position: relative;
  z-index: 100;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 18px;
  color: #333;
background-color: #fff;
}
#nav {
  position: absolute;
  bottom: 0;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-top: 1PX #ccc solid;
    a {
        font-size: 15px;
        color: #666;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        i{
          font-size: 22px;
          color: #d7d7d7;
        }
        &.router-link-exact-active {
            color: #2d8cf0;
            i{
               color: #2d8cf0;
            }
        }
    }
}
</style>
