
<template>
  <div class="sub order">
    <div class="header">
      <p>
        <i class="iconfont iconzuo" @click="back"></i>
        确认订单
      </p>
    </div>
    <div class="select j-s-a">
      <div class="address" v-if="selectAddress">
        <p>
          <span>{{ selectAddress.name }}</span
          ><span>{{ selectAddress.tel }}</span>
        </p>
        <p>{{ selectAddress.address }}</p>
      </div>
      <p v-else>请添加收货地址</p>
      <i class="iconfont iconyou-copy" @click="toAddress"></i>
    </div>
    <div class="info flex">
      <img :src="curGood.img" alt="" />
      <div class="right">
        <h3>{{ curGood.title }}</h3>
        <p>{{ select.sku }}</p>
        <p class="j-s-a">
          <span>￥{{ curGood.price * select.count }}</span>
          <span>x {{ select.count }}</span>
        </p>
      </div>
    </div>

    <div class="pei">
      <p class="j-s-a"><span>配送方式</span> <span>快递</span></p>
      <p class="j-s-a">
        <span>优惠券</span>
        <span>暂无可用<i class="iconfont iconyou-copy"></i></span>
      </p>
    </div>

    <div class="message">
      <p>买家留言</p>
      <textarea
        name=""
        id=""
        cols="10"
        rows="5"
        placeholder="50字以内"
      ></textarea>
    </div>

    <div class="price">
      <p class="j-s-a">
        <span>商品金额</span><span>￥ {{ curGood.price * select.count }}</span>
      </p>
      <p class="j-s-a"><span>运费</span><span>￥ 0</span></p>
      <p class="j-s-a"><span>优惠</span><span>￥ 0</span></p>
    </div>

    <div class="footer j-s-a">
      <p>共 {{ select.count }} 件</p>
      <p class="j-s-a">
        <span class="_price">￥{{ curGood.price * select.count }}</span>
        <span class="btn" @click="submit">提交订单</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
import axios from "axios";
export default {
  namr: "order",
  data() {
    return {};
  },
  created() {
       this.$store.dispatch('user/getAddress')
  },
  computed: {
    ...mapState({
      curGood: (state) => state.good.curGood,
      select: (state) => state.good.select,
      selectAddress: (state) => state.user.selectAddress,
    }),
  },
  methods: {
    toAddress() {
      this.$router.push({ name: "AddressList" });
    },
    submit() {
        if(!this.selectAddress){
            this.$toast('请选择收货地址');
            return;
        }
      Dialog.confirm({
        title: "支付",
        message: "是否支付",
      })
        .then(() => {
          // on confirm
          
            axios
        .post("/api/order/addOrder", {
          count: this.select.count,
          sku: this.select.sku,
          good: this.curGood,
          price: this.curGood.price * this.select.count,
          address: this.selectAddress,
          state: "待发货",
        })
        .then((res) => {
          this.$toast('付款成功，可前往个人中心查看')
        });
    }) .catch(() => {
          // on cancel
            axios
        .post("/api/order/addOrder", {
          count: this.select.count,
          sku: this.select.sku,
          good: this.curGood,
          price: this.curGood.price * this.select.count,
          address: this.selectAddress,
          state: "待付款",
        })
        .then((res) => {
         this.$toast('您已取消付款，可前往个人中心再次支付')
        });
        });
    
  },
  }
}
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px #ccc solid;
}
.address {
  font-size: 14px;
  line-height: 14px;
  text-align: left;
}
.order {
  background-color: #f2f2f2;
}
.select {
  padding: 0 15px;
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  i {
    font-size: 16px;
  }
}

.info {
  background-color: #fff;
  margin-top: 15px;
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
.pei {
  background-color: #fff;
  padding: 15px 15px 5px 15px;
  margin-top: 15px;
  font-size: 16px;
  p {
    margin-bottom: 15px;
  }
}
.message {
  background-color: #fff;
  margin-top: 15px;
  padding: 10px;
  text-align: left;
  font-size: 16px;
  textarea {
    resize: none;
    width: 100%;
    margin-top: 15px;
  }
}
.price {
  background-color: #fff;
  margin-top: 15px;
  padding: 10px;
  font-size: 16px;
  line-height: 25px;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  padding: 0 15px;
  line-height: 80px;
  font-size: 16px;
  background-color: #fff;
  ._price {
    font-size: 18px;
    color: #ed4514;
  }
  .btn {
    height: 40px;
    width: 120px;
    line-height: 40px;
    border-radius: 20px;
    display: inline-block;
    background-color: #ed4514;
    margin-left: 20px;
    color: #fff;
  }
}
</style>