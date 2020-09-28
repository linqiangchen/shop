<template>
    <div class="login sub">
    <div class="header">
      <h1>会员登录</h1>
    </div>


    <input type="text">
    <input type="text" name="" id="">

    <button @click="login">登录</button>
    </div>

</template>

<script>
import axios from 'axios'
export default {
    name:'login',
    methods: {
        login(){
            axios.post('/api/user/login',{user:13766345195,pass:"462355ff"}).then((res)=>{
                console.log(res);
                if(res.data.code === 0){
                    this.$store.commit('user/setLogin',true)
                    this.$router.push('/')
                }
            })
        }
    },
}
</script>

<style>

</style>