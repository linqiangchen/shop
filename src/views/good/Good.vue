<template>
  <div class="good page">
    <div class="header">
      <h1>全部商品</h1>
    </div>

    <div class="nav j-s-a">
      <div class="search">
        <input type="text" class="inp" placeholder="请输入关键词" v-model="kw"/>
        <span @click="search"><i class="iconfont iconsearch1"></i></span>
      </div>
      <div class="classify j-s-a" @click="show(true)">
        <i class="iconfont iconliebiao"></i>
        <span>{{selectClassify}}</span>
      </div>
      <div class="mask" @click="show(false)" v-show="showMask">
        <ul>
            <li @click="classify(-1)">全部分类</li>
            <li @click="classify('手链')">手链</li>
            <li @click="classify('项链')">项链</li>
            <li @click="classify('耳环')">耳环</li>
            <li @click="classify('腕表')">腕表</li>
            <li @click="classify('其他')">其他</li>
        </ul>
      </div>
    </div>
    <div class="list">
        <ul class="list-nav flex"> 
            <li class="price" :class="{active:index===orderState}" v-for="(item,index) in orderList" :key="item.rule" @click="handleOrder(index)"> <span>{{item.title}}</span><span class="order" ><i class="top"  :class="{selectOrderBottom:item.state === 0}"></i><i class="bottom" :class="{selectOrderTop:item.state === 1}"></i></span></li>  
        </ul>
         <iscroll-view class="content" @scrollStart="log" @pullUp="load" ref="iscroll">
            <list :data="goodList"></list>
         </iscroll-view>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
// @ is an alias to /src
import list from "@/components/list.vue";
import { mapState } from 'vuex';
export default {
  name: "Good",
  components: {
    list,
  },
  data(){
      return{
          showMask:false,
          offset:1,
          select:-1,
          kw:'',
          orderState:0,
          goodList:[],
          orderList:[{
            rule:'oldPrice',
            title:'综合',
            state:0,
          },
          {
            rule:'sale',
            title:'销量',
            state:0,
          },
          {
            rule:'id',
            title:'新品',
            state:0,
          },
          {
            rule:'price',
            title:'价格',
            state:0,
          },
          ]
      }
  },
  computed: {
    ...mapState({
      allGood:state=>state.good.allGood
    }),
    selectClassify(){
      return this.select === -1? '全部':this.select
    },
    showGood(){
      let list = JSON.parse(JSON.stringify(this.allGood))
      return list
    }
  },
  watch: {
    allGood:{
      handler(newVAl){  
        this.goodList = JSON.parse(JSON.stringify(newVAl))
      },
      immediate:true
    }
  },
  created() {
    this.$store.dispatch('good/getAllGood',{sort:this.orderList[this.orderState].rule,offset:1,state:-1})
  },
  methods: {
      show(bool){
          this.showMask = bool
      },
      sort(){
        this.goodList = this.goodList.sort((a,b)=> a[this.orderList[this.orderState].rule] - b[this.orderList[this.orderState].rule])
      },
      handleOrder(index){
        this.$refs.iscroll.scrollTo(0,0,0)
        if(index === this.orderState){
          this.orderList[index].state = (this.orderList[index].state +1)%2 ;
          this.$store.dispatch('good/getAllGood',{sort:this.orderList[this.orderState].rule,offset:1,state:this.orderList[this.orderState].state})
        }else{
          this.orderState = index
           this.$store.dispatch('good/getAllGood',{sort:this.orderList[this.orderState].rule,offset:1,state:this.orderList[this.orderState].state})
        }
      },
      search(){
        this.select = '搜索'
        this.offset = 1;
        this.$store.dispatch('good/searchGood',{kw:this.kw,offset:this.offset})
      },
      load(){
        if(this.select === -1){
      this.offset++;
       this.$store.dispatch('good/getAllGood',{
         sort:this.orderList[this.orderState].rule,
         offset:this.offset
         ,state:this.orderList[this.orderState].state})
        }
      },
      classify(data){
        this.select = data
          this.$store.dispatch('good/getClassifyGood',data)
      }
  },
};
</script>
<style lang="scss" scoped>
.header {
  background-color: #fff;
}
.good {
  background-color: #f2f2f2;
}
.nav {
  height: 60px;
  padding: 10px;
  .search {
      border-radius: 5px;
    height: 40px;
    width: 250px;
    display: flex;
    overflow: hidden;
    border: 1PX #ccc solid;
    input {
      height: 40px;
      border: none;
      outline: none;
      display: block;
      color: #999;
    }
    .inp {
      width: 200px;
      font-size: 18px;
      text-indent: 15px;
    }
    span {
      flex: 1;
      height: 40px;
      background-color: #fff;
      color: #666;
      i {
        font-size: 30px;
        line-height: 40px;
        color: #666;
      }
    }
  }

  .classify {
           border-radius: 5px;
      background-color: #fff;
    width: 100px;
    height: 40px;
 
    justify-content: space-around;
    font-size: 18px;
    i {
        font-size: 30px;
        line-height: 40px;
      }
  }
}
.mask{
    position: fixed;
    top: 45px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5) ;
    // box-shadow: 0px 0px 0px 999px #ccc;
 
    z-index: 10;
    ul{
        position: absolute;
         padding: 0 15px;
         right: 0;
         bottom: 0;
         top: 0;
    width: 150px;
    background-color: #fff;
    }
    li{
        height: 65px;
        line-height: 65px;
        font-size: 18px;
       
        border-bottom: 1PX #ccc solid;
    }
}
.content{
    padding: 5px 10px;
  position: absolute;
  top: 164px;
  bottom: 0px;
 background-color: #f2f2f2;
  left: 0;
  right: 0;
  overflow: hidden;
}
.list{
     padding: 0 10px;
    background-color: #fff;
    height: 60px;
    padding-top:20px;
    .list-nav{

        height: 40px;
        li{
            margin-right: 40px;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            color: #333;
        }
         .active{
                color: #2D8CF0;
                border-bottom: 1PX #2D8CF0 solid;
                .selectOrderBottom{
                  border-bottom-color: #2D8CF0 !important;
                }
                .selectOrderTop{
                  border-top-color: #2D8CF0 !important;
                }
            }
        .price{
            display: flex;
            align-items: center;
            span{
                height: 40px;
            }
            .order{
         
                display: flex;
                 margin-left: 5px;
                flex-direction: column;
                justify-content: center;
                i{
                   width: 6px;
                   height: 0;
                   border: 6px transparent solid;
                   
                }
                .top{
                    border-bottom-color:#333;
                    margin-bottom: 4px;
                }
                .bottom{
                    border-top-color:#333;
                }
            }
        }
    }
}
</style>
