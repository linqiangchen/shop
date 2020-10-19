<template>
  <div class="sub">
    <div class="header">
      <p>
        <i class="iconfont iconzuo" @click="back"></i>
        修改昵称
      </p>
    </div>

    <div class="wrap ">
      <div class="inp j-s-a"><input type="text" v-model="name" /></div>

      <div class="btn" @click="updateName">
      保存
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name:'updateName',
    data(){
        return{
            name:''
        }
    },
    computed: {
        ...mapState({
            info:(state)=>state.user.info
        })
    },
    created(){
        this.name = this.info.name
    },
    methods: {
        updateName(){
            if(!this.name.trim()){

                return
            }
            axios.get('/api/user/updateName?name=' + this.name).then((res)=>{
                this.$toast(res.data.msg)
                this.$router.replace('/mine/userInfo')
                 this.$store.dispatch('user/getInfo')
            })
        }
    },
};
</script>

<style lang='scss' scoped>
.wrap {
  padding: 15px;
  .inp {
    width: 100%;
    height: 45px;
    overflow: hidden;
    border: 1PX #ccc solid;
  }
  input {
    width: 100%;
    height: 45px;
    border: none;
    outline: none;
    font-size: 16px;
    text-indent: 15px;
  }

  .btn{
      margin: 20px auto;
      border-radius: 10px;
      width: 150px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #fff;
       background-color:#2D8CF0 ;
  }
}
</style>