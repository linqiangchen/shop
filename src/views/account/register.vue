<template>
    <div class="register sub">
    <div class="header">
      <h1>会员注册</h1>
    </div>


    <div class="form">
      <p class="j-s-a"><label for="">手机号</label><input type="text" placeholder="请输入手机号" v-model="user"/></p>
      <p class="j-s-a"><label for="">密码</label> <input type="password" name="" id="" placeholder="请输入密码" v-model="pass"/></p>
      <p class="j-s-a"><label for="">确认密码</label> <input type="password" name="" id="" placeholder="请输入密码" v-model="repeatPass"/></p>
    </div>

    <div @click="login" class="btn">注册</div>
    <p class="info">注册即代表同意同意<a href="">《商城用户协议》</a><router-link to="/login">前往登录</router-link></p>
    </div>

   
</template>

<script>
import axios from 'axios'
export default {
  name:'register',
  data(){
      return {
          user:'',
          pass:'',
          repeatPass:''
      }
  },
  methods: {
    login() {
        if(this.user.trim() === '' || this.pass === '' || this.repeatPass === ''){
            return
        }
        if(this.pass !== this.repeatPass){
          return
        }
      axios
        .post("/api/user/register", { user: this.user, pass: this.pass })
        .then((res) => {
         alert(res.data.msg)
          if (res.data.code === 0) {
            this.$router.push("/login");
          }
        });
    },
  },
}
</script>

<style lang='scss' scoped>
  .sub{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
}
.header{
    border-bottom: 1PX #ccc solid;
}
    .form{
        width: 100%;
        p{
            padding: 15px 20px;
            line-height: 50px;
            height: 50px;
            overflow: hidden;
            border-bottom: 1PX #ccc solid;
            input{
                flex: 1;
                height: 50px;
                border: none;
                outline: none;
                margin-left: 10px;
                 font-size: 16px;
            }
            label{
                width: 70px;
                font-size: 16px;
                text-align-last: justify;
            }
        }
    }
    .btn{
        margin: 0 auto;
        margin-top: 70px;
        margin-bottom: 15px;
        width: 80%;
        background-color: #2D8CF0;
        height: 50px;
        font-size: 18px;
        line-height: 50px;
        color: #fff;
        border-radius: 10px;
    }
    .info{
        font-size: 14px;
        color: #333;
        a{
            color: #2D8CF0;
        }
    }
</style>