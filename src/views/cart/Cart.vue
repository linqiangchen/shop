<template>
  <div class="cart page">
    <div class="header">
      <h1>购物车</h1>
    </div>
    <div class="option">
      <p>编辑</p>
    </div>
    <iscroll-view class="content" @scrollStart="log" ref="iscroll">
      <ul>
        <li v-for="item in cartList" :key="item._id" class="flex">
          <div class="left j-s-a">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="goodID"
              :value="item._id"
            
            />
            <img :src="item.good.img" alt="" />
          </div>
          <div class="right flex">
            <h3>{{ item.good.title }}</h3>
            <p class="selected">
              <span>{{ item.sku }}</span
              ><i class="iconfont iconsanjiaoxing1"></i>
            </p>
            <div class="info j-s-a">
              <p class="price">￥{{ item.good.price }}</p>
              <p class="count j-s-a"><van-stepper v-model="item.count" @change="onChange(item._id,item.count)"  /></p>
            </div>
          </div>
        </li>
      </ul>
    </iscroll-view>
    <div class="bottom j-s-a">
      <div class="select">
        <input type="checkbox" name="all" id="" v-model="selectAll"   @change="handleSelect"/>
        <label for="">全选</label>
      </div>
      <div class="right flex">
        <div class="sum">
          <p class="num">￥{{ sunPricce }}</p>
          <p>不含运费</p>
        </div>
        <div class="btn">
          <span @click="pay">结算</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import axios from "axios";
import { Rate, Stepper } from "vant";

import { mapState } from "vuex";
Vue.use(Stepper);
Vue.use(Rate);
export default {
  name: "Cart",
  data() {
    return {
      count: 1,
      cartList: [],
      goodID: [],
      select: [],
      selectAll: false,
    };
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
    }),
    sunPricce() {
      let num = 0;
      this.select.forEach((item) => {
        num += item.good.price * item.count;
      });
      return num ? num : 0;
    },
  },
  watch: {
    cart(newVal) {
      if (newVal) {
        this.cartList = newVal
      }
    },
    selectAll(newVAl) {
      if (newVAl) {
        this.select = this.cartList;
         this.goodID =this.cartList.map((item) => item._id);
      }
    },

    goodID(newVal) {
      this.select = this.cartList.filter(
        (item) => newVal.findIndex((id) => id === item._id) >= 0
      );
      if(newVal.length === this.cartList.length && newVal.length >0){
        
        this.selectAll = true
      }else{
        this.selectAll = false
      }
    },
  },
  created() {
    this.$store.dispatch("cart/getCart");
  },
  methods: {
    handleSelect(){
      if(!this.selectAll){
          this.select = []
         this.goodID =[]
      }

    },
    onChange(id,count){
      axios.get('/api/cart/updateCartCount?id=' + id + '&count=' + count).then(res =>{
        
      })
    },
    pay(){
      this.$store.commit('cart/setPayment',this.select)
      this.$router.push({name:'payment'})
    }
  },
};
</script>
<style lang="scss" scoped>
.page {
  background-color: #f2f2f2;
}
.option {
  height: 38px;
  text-align: right;
  font-size: 16px;
  padding: 0 15px;
  line-height: 38px;
  color: #2d8cf0;
}
.content {
  position: absolute;
  top: 82px;
  bottom: 75px;

  left: 0;
  right: 0;
  overflow: hidden;
  ul {
    li {
      padding: 20px 10px;
      background-color: #fff;
      height: 175px;
      margin-bottom: 15px;
      .left {
        width: 150px;
        img {
          margin-left: 5px;
          width: 126px;
          height: 126px;
        }
      }
      .right {
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        margin-left: 10px;
        flex: 1;
        h3 {
          font-size: 16px;
          color: #333;
          text-align: left;
        }
        .selected {
          width: 90px;
          height: 35px;
          background-color: #f2f2f2;
          border-radius: 5px;
          color: #999;
          text-align: center;
          line-height: 35px;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            color: #999;
            margin-left: 5px;
          }
        }
        .price {
          font-size: 16px;
          color: #ed3f14;
        }
        .info {
          width: 100%;
        }
        .count {
          font-size: 16px;
          width: 110px;
          height: 35px;
          line-height: 35px;

          span {
            height: 35px;
            width: 35px;
            background-color: #f2f2f2;
          }
        }
      }
    }
  }
}
input {
  width: 15px;
  height: 15px;
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75px;
  background-color: #fff;
  padding: 0 10px;
  .select {
    font-size: 16px;
    color: #333;
  }
  .right {
    display: flex;
    justify-content: flex-end;
    .btn {
      span {
        display: block;
        width: 120px;
        height: 46px;
        border-radius: 23px;
        line-height: 46px;
        text-align: center;
        background-color: #ed3f14;
        color: #fff;
        font-size: 18px;
        letter-spacing: 10px;
      }
    }
    .sum {
      margin-right: 15px;
      font-size: 14px;
      color: #666;
      .num {
        margin-bottom: 5px;
        color: #ed3f14;
        font-size: 18px;
      }
    }
  }
}
</style>