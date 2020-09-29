<template>
  <div class="sub">
    <div class="header">
      <p>
        <i class="iconfont iconzuo" @click="back"></i>
        修改地区
      </p>
    </div>

  <van-area title="标题" :area-list="areaList" :columns-num="2" @confirm ="handle"/>
  </div>
</template>

<script>
  import Vue from 'vue';
import { Area } from 'vant';
import axios from 'axios'
 import areaList from '../../../public/data/area'
Vue.use(Area);
export default {
    name:'updateLocation',
   
    data(){
        return {
            areaList
        }
    },
    methods: {
        handle(area){
            console.log(area);
            let localtion = area.map(item => item.name).join('')
            console.log('localtion: ', localtion);
            axios.get('/api/user/updateLocation?location=' + localtion).then((res)=>{
                this.$toast(res.data.msg)
                this.$router.replace('/mine/userInfo')
                 this.$store.dispatch('user/getInfo')
            })
        }
    },

};
</script>

<style>
</style>