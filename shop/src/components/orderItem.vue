<template>
  <div class="rederItem">
  <div class="top j-s-a">
    <img :src="data.good.img" alt="">
    <div class="right">
        <p>{{data.good.title}}</p>
        <p>{{data.sku}}</p>
        <p class="j-s-a"><span>￥{{data.good.price}}</span><span>x {{data.count}} </span></p>
    </div>
    </div>
    <div class="bottom j-s-a">
    <p>订单金额：<span class="price">￥{{data.good.price * data.count}}</span></p>

    <p class="j-s-a" v-if="data.state === '待付款'"><span class="btn-left btn">取消订单</span><span class="btn-right btn" @click="pay(data)">去支付</span></p>
     <p class="j-s-a"  v-if="data.state === '待发货'"><span class="btn-left btn">申请退款</span></p>
      <p class="j-s-a"  v-if="data.state === '待收货'"><span class="btn-right btn" @click="receiving(data)">确认收货</span></p>
       <p class="j-s-a"  v-if="data.state === '待评价'"><span class="btn-left btn" >再来一单</span><span class="btn-right btn" @click="comment(data)">{{data.state === '待评价'?'待评价':'已评价'}}</span></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'orderItem',
    props:{
     data:{
       type:Object
     }
  },
  methods: {
      pay(item){
          axios.get('/api/order/updateOrderState?id='+ item._id + '&state=待发货').then(res =>{
              this.$toast('付款成功，可前往个人中心查看')
            //   this.$router
              this.$store.dispatch('user/getOrder')
          })
    },
    receiving(item){
          axios.get('/api/order/updateOrderState?id='+ item._id + '&state=待评价').then(res =>{
              this.$toast('收货成功，可前往个人中心评价')
            //   this.$router
              this.$store.dispatch('user/getOrder')
          })
    },
    comment({good,_id,state}){
        if(state === '完成'){
            return
        }
        this.$store.commit('order/setOrderID',_id)
        this.$store.commit('good/setCurGood',good)
        this.$router.push({name:'comment'})
    }
  },
}
</script>

<style lang="scss" scoped>
    .rederItem{
        padding: 15px;
        margin-bottom: 15px;
        background-color: #fff;
        .top{
            img{
                width: 120px;
                height: 120px;
            }
            .right{
                flex: 1;
                text-align: left;
                display: flex;
                font-size: 16px;
                flex-direction: column;
                justify-content: space-around;
                height: 120px;
            }
        }
        .bottom{
            font-size: 16px;
            .price{
                 font-size: 18px;
      color: #ed4514;
            }
            .btn{
                height: 35px;
                line-height: 35px;
                text-align: center;
                width: 80px;
                border-radius: 5px;
                margin: 0 5px;
            }
            .btn-left{
                border: 1PX #2D8CF0 solid;
                color: #2D8CF0;
                
            }
            .btn-right{
                 color:#fff;
                background-color: #2D8CF0;
            }
        }
    }
</style>