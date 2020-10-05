<template>
  <div class="login sub">
    <div class="header">
      <h1>会员登录</h1>
    </div>

    <div class="form">
      <p class="j-s-a"><label for="">手机号</label><input type="text" placeholder="请输入手机号" v-model="user"/></p>
      <p class="j-s-a"><label for="">密码</label> <input type="password" name="" id="" placeholder="请输入密码" v-model="pass"/></p>
    </div>

    <div @click="login" class="btn">登录</div>
    <p class="info">登录即代表同意同意<a href="">《商城用户协议》</a><router-link to="/register">前往注册</router-link></p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data(){
      return {
          user:'',
          pass:''
      }
  },
  methods: {
    login() {
        if(this.user.trim() === '' || this.pass === ''){
            return
        }
      axios
        .post("/api/user/login", { user: this.user, pass: this.pass })
        .then((res) => {
         this.$toast(res.data.msg)
          if (res.data.code === 0) {
            this.$store.commit("user/setLogin", true);
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">

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
                width: 60px;
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