<template>
  <div class="sub">
     <div class="header">
    <p>
    <i class="iconfont iconzuo" @click="back"></i>
    个人信息
    </p>
</div>

<div class="message">
        <ul>
            <li class="j-s-a" @click="toggleRouter('/mine/userInfo/updateAvatar')">
                <span>头像</span>
                 <div class="j-s-a">
                    <img :src="info.avatar" alt="">
                    <i class="iconfont iconyou-copy"></i>
                 </div>
            </li>
            <li class="j-s-a"  @click="toggleRouter('/mine/userInfo/updateName')">
                <span>昵称</span>
                 <div class="j-s-a">
                   <p>{{info.name}}</p>
                    <i class="iconfont iconyou-copy"></i>
                 </div>
            </li>
            <li class="j-s-a"  @click="toggleRouter('')">
                <span>手机</span>
                <div class="j-s-a">
                   <p>{{info.user}}</p>
                  
                 </div>
            </li>
            <li class="j-s-a"  @click="toggleRouter('/mine/userInfo/updateGender')">
                <span>性别</span>
               <div class="j-s-a">
                   <p>{{info.gender}}</p>
                    <i class="iconfont iconyou-copy"></i>
                 </div>
            </li>
            <li class="j-s-a"  @click="toggleRouter('/mine/userInfo/updateBirth')">
                <span>生日</span>
               <div class="j-s-a">
                   <p>{{info.birth}}</p>
                    <i class="iconfont iconyou-copy"></i>
                 </div>
            </li>
            <li class="j-s-a"  @click="toggleRouter('/mine/userInfo/updateLocation')">
                <span>地区</span>
               <div class="j-s-a">
                   <p>{{info.location}}</p>
                    <i class="iconfont iconyou-copy"></i>
                 </div>
            </li>
         
        </ul>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'info',
    methods: {
        toggleRouter(path){
            if(!path){
                return
            }
          this.$router.push(path)
      }
    },
     computed: {
      ...mapState({
          info:(state) => state.user.info
      })
  },
}
</script>

<style lang="scss" scoped>
     .message{

         padding:0 10px;
        background-color: #fff;
        border-radius: 10px;
        ul{
          
            li{
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                span{
                    width: 40px;
                    text-align-last: justify;
                }
                img{
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    
                }
                border-bottom: 1PX #ccc solid;
                i{
                    margin-left: 15px;
                     font-size: 16px;
                }
            }
        }
    }
</style>