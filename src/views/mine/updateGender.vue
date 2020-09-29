<template>
  <div class="sub">
    <div class="header">
      <p>
        <i class="iconfont iconzuo" @click="back"></i>
        修改性别
      </p>
    </div>

    <div class="wrap ">
      <div class="inp ">
      <p>
      <input type="radio" name="gender" id="" v-model="gender" value="男"><label for="">男</label>
      </p>
      <p>
      <input type="radio" name="gender" id="" v-model="gender" value="女"><label for="">女</label>
      </p>
      </div>

      <div class="btn" @click="updateGendel">
      保存
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  name:'updateGendel',
  data(){
        return{
            gender:''
        }
    },
    computed: {
        ...mapState({
            info:(state)=>state.user.info
        })
    },
    created(){
        this.gender = this.info.gender
    },
    methods: {
        updateGendel(){
            if(!this.gender.trim()){

                return
            }
            axios.get('/api/user/updateGender?gender=' + this.gender).then((res)=>{
                this.$toast(res.data.msg)
                this.$router.replace('/mine/userInfo')
                 this.$store.dispatch('user/getInfo')
            })
        }
    },
};
</script>

<style lang='scss' scoped>
.header{
  border-bottom: 1PX #ccc solid;
}
.wrap {
  padding:0 px;
  .inp {
    width: 100%;
    
    overflow: hidden;

  }
  p{
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    display: flex;
    align-items: center;
        border-bottom: 1PX #ccc solid;
  }
  input {
    margin-right: 15px;
 width: 16px;
    height: 25px;
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