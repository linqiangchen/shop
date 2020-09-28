<template>
  <div class="mine page">
       <div class="header">
        <h1>会员中心</h1>
    </div>
<iscroll-view class="content" @scrollStart="log" ref="iscroll">
 <div class="user j-s-a">
        <div class="left j-s-a">
            <img src="http://p4.music.126.net/pMVnViboITvn_KDmcfoaEA==/109951164873911421.jpg" alt="">
            <p>花式傲娇冠菌</p>
        </div>
        <div class="right">
        <span>成为会员</span>
        </div>
    </div>

    <div class="order">
        <p class="j-s-a">
        <span>我的订单</span>
        <a href="">查看全部 <i class="iconfont iconyou-copy"></i></a>
        </p>
        <ul class="j-s-a">
            <li>
                <i class="iconfont icondaifukuan"></i>
                <span>待付款</span>
            </li>
            <li>
                <i class="iconfont iconfahuo"></i>
                <span>待发货</span>
            </li>
            <li>
                <i class="iconfont icondaishouhuo"></i>
                <span>待收货</span>
            </li>
            <li>
                <i class="iconfont iconpingjia"></i>
                <span>评价</span>
            </li>
            <li>
                <i class="iconfont iconshou"></i>
                <span>退款/售后 </span>
            </li>
        </ul>
    </div>

    <div class="logistics">
        <p class="tit">最新物流</p>
        <div class="detail j-s-a">
        <img src="http://p1.music.126.net/bgp1zfjQ1K9npT6F894w5A==/109951165151246317.jpg" alt="">
        <div class="right">
            <h3>运输中</h3>
            <p>【硬核守护】12星座守护项链 s925纯银</p>
        </div>
        </div>
    </div>

    <div class="message">
        <ul>
            <li class="j-s-a">
                <span>我的优惠券</span>
                 <i class="iconfont iconyou-copy"></i>
            </li>
            <li class="j-s-a">
                <span>收货地址</span>
                 <i class="iconfont iconyou-copy"></i>
            </li>
            <li class="j-s-a">
                <span>个人信息</span>
                 <i class="iconfont iconyou-copy"></i>
            </li>
        </ul>
    </div>
</iscroll-view>
   
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Mine',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss" scoped>
    .mine{
        background-color: #F2F2F2;
    }
    .user{
        height: 100px;
        padding: 25px 20px;
        .left{
            height: 50px;
            img{
                height: 50px;
                width: 50px;
                border-radius: 50%;
                margin-right: 10px;

            }
        p{
            font-size: 16px;
            color: #333;
        }
        }
        .right{
            height: 50px;
            width: 110px;
            span{
                display: block;
                border-radius: 5px;
                font-size: 16px;
                color: #fff;
                height: 45px;
                width: 110px;
                line-height: 45px;
                background-color:#2D8CF0 ;
            }
        }
    }
    .content{
         padding: 0 10px;
  position: absolute;
  top: 44px;
  bottom: 0px;
background-color: #F2F2F2;
  left: 0;
  right: 0;
  overflow: hidden;
    }
    .order{
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        p{
            padding: 10px 0;
            font-size: 16px;
            color: #333;
            a{
                color: #2D8CF0;
                i{
 font-size: 16px;
                }
               
            }
        }
        ul{
            padding: 15px 0;
            li{
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: 14px;
                color: #333;
                i{
                    font-size: 25px;
                    color: #666;
                    margin-bottom: 10px;
                }
            }
        }
    }
    .logistics{
        margin-top: 20px;
         padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        .tit{
            text-align: left;
              padding: 10px 0;
            font-size: 16px;
            color: #333;
        }
        .detail{

            img{
                width: 100px;
                height: 100px;
            }
            .right{
                height: 100px;
                display: flex;
                text-align: left;
                flex-direction: column;
                justify-content:space-around;
                padding-right: 20px;
                margin-left: 10px;
                h3{
                    font-size: 18px;
                    color: #333;
                }
                p{
                    font-size: 16px;
                    color: #666;
                }
            }
        }
    }
    .message{
        margin-top: 20px;
         padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        ul{
            padding: 10px;
            li{
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                border-bottom: 1PX #ccc solid;
                i{
                     font-size: 16px;
                }
            }
        }
    }
</style>