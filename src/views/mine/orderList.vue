<template>
  <div class="orderList sub">
     <div class="header">
    <p>
    <i class="iconfont iconzuo" @click="back"></i>
    我的订单
    </p>
</div>
 <iscroll-view class="content" @scrollStart="log" ref="iscroll">
<div class="nav">
    <ul class="j-s-a">
        <li v-for="(item ,index) in navList" :key="index" :class="{active:select === index}" @click="handleSelect(index)">{{item.title}}</li>
    </ul>
</div>

<div class="order">
<ul>
<li v-for="item in showList" :key="item._id">
<orderItem :data="item"/>
</li>
</ul>

</div>
 </iscroll-view>
 <router-view></router-view>
</div>
</template>

<script>
import orderItem from '../../components/orderItem';
import { mapState } from 'vuex';

export default {
    name:'orderList',
    components:{
        orderItem
    },
    created() {
        this.select = this.$route.query.state*1
    },
    computed: {
        ...mapState({
            order:state=>state.user.order
        }),
    },
    data(){
        return {
            navList:[
                {
                    title:'全部'
                },
                {
                    title:'待付款'
                },
                {
                    title:'待发货'
                },
                {
                    title:'待收货'
                },
                {
                    title:'待评价'
                },
            ],
            select: 0,
             showList:[]
        }
    },
    watch: {
        select:{
            handler(newVal){
            if(newVal === 0){
                this.showList = this.order
            }else{
                this.showList = this.order.filter(item => item.state === this.navList[newVal].title)
            }
        },
        immediate:true
        },
        order:{
            handler(newVal){
            if(newVal){
                if(this.select*1 === 0){
                this.showList = this.order
            }else{
                this.showList = this.order.filter(item => item.state === this.navList[this.select*1].title)
            }
            }
        },
        immediate:true
        },
    },
    methods: {
        handleSelect(index){
            this.select = index
            console.log('index: ', index);
            this.$router.push('/mine/orderList?state=' + index)
        }
    },
}
</script>

<style lang="scss" scoped>
    .header{
        border-bottom: 1PX #ccc solid;
    }
    .content{
    position: absolute;
    top: 50px;
    bottom: 0px;
    left: 0;
    right: 0;
    overflow: hidden;
}
    .nav{
        ul{
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            padding: 2px 10px;
            .active{
                color: #2D8CF0;
                border-bottom: 1PX #2D8CF0 solid;
            }
        }
    }
    .order{
        background-color: #f2f2f2;
    }
</style>