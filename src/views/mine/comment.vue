
<template>
  <div class="sub comment">
    <div class="header">
      <p>
        <i class="iconfont iconzuo" @click="back"></i>
        发布评价
      </p>
    </div>
    <div class="info j-s-a">
        <img :src="curGood.img" alt="">
        <p class="right">{{curGood.title }}</p>
    </div>
    <div class="rate">
    <van-rate v-model="star" />
    </div>
    
    <div class="message">

      <textarea
        name=""
        id=""
        cols="10"
        rows="10"
        v-model="con"
        placeholder="请输入您的评价内容"
      ></textarea>
    </div>
    <div class="btn" @click="comment">
    发布
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import { Rate } from 'vant';
Vue.use(Rate);
import axios from "axios";
export default {
  namr: "comment",
  data() {
    return {
        star:5,
        con:''
    };
  },
  created() {
       this.$store.dispatch('user/getAddress')
  },
  computed: {
    ...mapState({
      curGood: (state) => state.good.curGood,
     orderID: (state) => state.order.curOrderID,
    }),
  },
  methods: {
   comment(){
       console.log(111);
       axios.post('/api/good/addComment',{
           con:this.con,
           star:this.star,
           goodID:this.curGood._id,
           orderID:this.orderID
       }).then((res)=>{
         this.$toast(res.data.msg)
           this.$router.back()
           this.$store.dispatch("user/getOrder");
       })
   }
  }
}
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px #ccc solid;
}
.comment{
    background: #fff;
}

.info {
  background-color: #fff;

  padding: 10px;
  img {
    width: 120px;
    height: 120px;
  }
  .right {
    margin-left: 10px;
    text-align: left;
    font-size: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.message {
  background-color: #fff;
  text-align: left;
  font-size: 16px;
  textarea {
    resize: none;
    padding: 10px 0 0 10px;
    width:95%;
   margin:  0 auto;
  }
}
.rate{
    margin: 20px;
    text-align: left;
}
.btn{
    height: 60px;
    width: 90%;
    margin: 20px auto;
    background:#2D8CF0 ;
    color: #fff;
    line-height: 60px;
    border-radius: 10px;
    font-size: 18px;
    letter-spacing: 10px;
}
</style>