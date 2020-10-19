<template>
  <div class="detail sub">
    <div class="header">
      <p>
        <i class="iconfont iconzuo" @click="back"></i>
        商品详情
      </p>
    </div>
    <iscroll-view class="content" @scrollStart="log" ref="iscroll">
      <div class="banner">
        <div class="swiper-container" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in curGood.detail" :key="index">
              <img
                :src="item"
                alt=""
              />
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="info">
        <h1>{{curGood.title}}</h1>
        <p class="j-s-a">
          <span class="flex price"><i>￥{{curGood.price}}</i> <i class="line">￥{{curGood.price + curGood.oldPrice}}</i></span>
          <span class="share">分享</span>
        </p>
      </div>
      <div class="message">
        <div class="flex">
          <span>发货</span>
          <p class="j-s-a"><span>快递：￥10</span><span>已售 {{curGood.sale}}</span></p>
        </div>
        <p>
          <span>服务</span><span>收货后结算 · 7天无理由退货 · 支持退换</span>
        </p>
      </div>
      <div class="comment">
        <p class="j-s-a title">
          <span>用户评价</span>
          <a href="">查看全部</a>
        </p>
        <ul>
          <li v-for="item in comment" :key="item.id">
            <div class="top j-s-a">
              <img
                :src="item.user.avatar"
                alt=""
              />
              <div class="user">
                <p>{{item.user.name}}</p>
                <p>{{item.user.time}}</p>
              </div>
              <van-rate v-model="item.star" readonly/>
            </div>
            <p>{{item.con}}</p>
          </li>
        </ul>
      </div>
    </iscroll-view>
    <div class="footer">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
        <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
        <van-goods-action-button type="warning" text="加入购物车" @click="showSelect" />
        <van-goods-action-button type="danger" text="立即购买" @click="showSelect" />
      </van-goods-action>
    </div>
    <div class="select" v-if="show">
        <div class="title">
        <p class="j-s-a">
        <span></span>
        <span class="price">￥{{curGood.price}}</span>
        <span @click="close"><i class="iconfont iconclosewhite"></i></span>
        </p>
        <p>剩余{{curGood.count}}件</p>
        <p>已选 {{curGood.sku[select].title}}</p>
        </div>
        <h1>选择款式</h1>
        <ul>
        <li v-for="(item ,index) in curGood.sku" :key="index" :class="{active : select === index}" @click="handleSelect(index)">
        <div><img :src="item.img" alt="">
        <p>{{item.title}}</p></div>
        </li>
        </ul>
        <div class="count j-s-a">
        <p>购买数量</p>
        <p><van-stepper v-model="count" /></p>
        </div>
        <div class="btn j-s-a">
        <span class="cart" @click="addCart">加入购物车</span>
        <span class="buy" @click="order">立即购买</span>
        </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from 'axios'
import { GoodsAction, GoodsActionIcon, Rate, GoodsActionButton } from "vant";
import { Stepper } from 'vant';
import { mapState } from 'vuex';
Vue.use(Stepper);
Vue.use(Rate);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
export default {
  data() {
    return {
      value: 3,
    count:1,
    show:false,
     select:0
    };
  },
methods: {
    showSelect(){
        this.show = true
    },
    close(){
        this.show = false
    },
    handleSelect(index){
      this.select = index
    },
    addCart(){
      axios.post('/api/cart/addCart',{
        goodID:this.curGood._id,
        sku:this.curGood.sku[this.select].title,
        count:this.count
      }).then(res =>{
         this.$toast(res.data.msg)
      })
    },
    order(){
      this.$store.commit('good/setSelect',{count:this.count,sku:this.curGood.sku[this.select].title})
      this.$router.push({name:'order'})
    }
},
computed: {
  ...mapState({
    curGood :state=> state.good.curGood,
    comment :state=> state.good.comment
  })
},
  mounted() {
    this.$nextTick(() => {
      var swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      });
    });
  },
};
</script>

<style lang='scss' scoped>
.content {
  position: absolute;
  top: 44px;
  bottom: 50px;

  left: 0;
  right: 0;
  overflow: hidden;
}
.detail {
  background-color: #f2f2f2;
}
.info {
  padding: 10px 15px;
  background-color: #fff;
  h1 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: left;
  }
  p {
    .price {
      font-size: 18px;
      color: #ed4514;

      .line {
        margin-left: 20px;
        color: #666;
        text-decoration: line-through;
      }
    }
    .share {
      width: 60px;
      border: 1px #2d8cf0 solid;
      height: 30px;
      line-height: 30px;
      color: #2d8cf0;
      border-radius: 5px;
    }
  }
}
.banner {
  background-color: #fff;
  padding: 0 20px;
}
.swiper-container {
  height: 240px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;

  .swiper-wrapper {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.message {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px 20px;
  div {
    font-size: 14px;
    p {
      padding: 0 20px;
      flex: 1;
      margin: 0;
    }
  }
  p {
    font-size: 14px;
    margin: 10px 0;
    text-align: left;
    span {
      margin-right: 20px;
    }
  }
}
.comment {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #fff;
  li {
    padding: 20px 0;
    border-bottom: 1px #ccc solid;
  }
  .title {
    font-size: 16px;
    margin-bottom: 15px;
    a {
      color: #2d8cf0;
    }
  }
  .top {
    margin-bottom: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .user {
      margin-left: 15px;
      flex: 1;
      text-align: left;
    }
  }
}
.select{
    position: fixed;
        box-shadow: 0px 0px 0px 999px rgba(0, 0, 0, 0.5) ;
    bottom: 0;
    left: 0;
    right: 0;
    top: 64px;
    z-index: 100;
    background-color: #fff;
    padding:  0 10px;
    .title{
  
        border-bottom: 1PX #ccc solid;
        p{
         font-size: 18px;
         margin: 10px 0;
         color: #333;
         font-weight: normal;
        i{
                   font-size: 25px;
        }
        .price{
              font-size: 18px;
      color: #ed4514;

        }
        }
        
    }
    h1{
        text-align: left;
        padding: 15px 0px;
        font-size: 18px;
         color: #333;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1PX #333 solid;
        li{
            width: 25%;
            padding: 0 5px;
            margin-bottom: 10px;
            div{
                border-radius: 5px 5px 0 0;
                overflow: hidden;
            }
            img{
                width: 100%;
                display: block;
            }
            p{
                font-size: 16px;
                padding: 4px;
                color: #333;
                background-color: #F2F2F2;
            }
        }
        .active{
            div{
                border: 1px #ED3F14 solid;
                p{
                    background-color: #ED3F14;
                    color: #fff;
                }
            }
        }
    }
    .count{
        p{
            font-size: 18px;
            color: #333;
            margin-top: 20px;
        }
    }
    .btn{
        height: 50px;
        margin-top: 20px;
        span{
            width: 50%;
            height: 50px;
            font-size: 18px;
            color: #fff;
            line-height: 50px;
        }
        .cart{
            background-color: #FF6600;
            border-radius: 25px 0 0 25px;
        }
        .buy{
            background-color: #ED3F14;
            border-radius: 0px 25px 25px 0;
        }
    }
}
</style>