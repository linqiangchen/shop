<template>
  <div class="addAccount">
    <div class="form">
      <p class="j-s-a"><label for="">账号</label><input type="text" v-model="user" /></p>
      <p class="j-s-a"><label for="">姓名</label><input type="text" v-model="name"/></p>
      <p class="j-s-a"><label for="">手机</label><input type="text" v-model="phone"/></p>
      <p class="j-s-a"><label for="">职位</label><input type="text" v-model="job"/></p>
    </div>
    <h1>权限分配</h1>
    <div class="table">
      <div class="wrap" v-for="item in select" :key="item.name">
        <div class="left">
          <p>{{ item.meta.title }}</p>
        </div>
        <div class="right" v-if="item.meta.hasSub">
          <div v-for="sub in item.children" :key="sub.name">
            <input type="checkbox" name="" :value="sub.name" id="" v-model="selectList" /><label for="">{{
              sub.meta.title
            }}</label>
          </div>
        </div>
        <div class="right" v-else>
          <input type="checkbox" name="" id=""  :value="item.name" v-model="selectList" /><label for="">{{
            item.meta.title
          }}</label>
        </div>
      </div>
    </div>

    <div class="option">
      <span class="btn" @click="login">确定</span>
      <span>取消</span>
    </div>
  </div>
</template>

<script>
import main from "../../router/module/mainRouter";
import axios from 'axios'
export default {
  data() {
    return {
      main,
      selectList:['home'],
      user:'',
      phone:'',
      name:'',
      job:''
    };
  },
  computed: {
    select() {
      return this.main.children.slice(1, -1);
    },
  },

  methods: {
      login(){
         axios.post('/os/account/register',{user:this.user,phone:this.phone,name:this.name,job:this.job,auth:this.selectList}).then((res)=>{
            if(res.data.code === 0){
              this.$message.info(res.data.msg);
            }
         }) 
      }
  },
};
</script>

<style lang="scss" scoped>
h1{
    margin:  20px 0;
}
.form {
  width: 300px;
  p {
    label {
      width: 60px;
      text-align-last: justify;
      padding: 0 10px;
    }
    input {
      flex: 1;
      margin: 0 20px;
      border: none;
      border: 1px #ccc solid;
      outline: none;
      height: 30px;
    }
  }
}
.table {
  width: 400px;

  border: 1px #ccc solid;
  border-bottom: none;
  .wrap {
    display: flex;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px #ccc solid;
  }
  .left {
    width: 80px;
    line-height: 30px;
    text-align: center;
    border-right: 1px #ccc solid;
  }
  .right {
    display: flex;
    align-items: center;
    input {
      margin: 0 5px;
    }
    flex: 1;
    text-align: left;
  }
}
.option {
  margin-top: 15px;
  span {
    cursor: pointer;
    display: inline-block;
    height: 30px;
    width: 80px;
    background-color: #fff;
    border: 1px #2d8cf0 solid;
    color: #2d8cf0;
    border-radius: 10px;
    line-height: 30px;
    text-align: center;
  }
  .btn {
    cursor: pointer;
    display: inline-block;
    height: 30px;
    width: 80px;
    border-radius: 10px;
    background-color: #2d8cf0;
    color: #fff;
    line-height: 30px;
    text-align: center;
    margin-right: 20px;
  }
}
</style>