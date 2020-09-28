<template>
  <div class="good page">
    <div class="header">
      <h1>全部商品</h1>
    </div>

    <div class="nav j-s-a">
      <div class="search">
        <input type="text" class="inp" placeholder="请输入关键词" />
        <span><i class="iconfont iconsearch1"></i></span>
      </div>
      <div class="classify j-s-a" @click="show(true)">
        <i class="iconfont iconliebiao"></i>
        <span>分类</span>
      </div>
      <div class="mask" @click="show(false)" v-show="showMask">
        <ul>
            <li>全部分类</li>
            <li @click="demo">手链</li>
            <li>项链</li>
            <li>耳环</li>
            <li>头饰</li>
            <li>其他</li>
        </ul>
      </div>
    </div>


    <div class="list">
        <ul class="list-nav flex">
            <li>综合</li>   
            <li>销量</li>  
            <li>新品</li>  
            <li class="price"><span>价格</span><span class="order"><i class="top"></i><i class="bottom"></i></span></li>  
        </ul>
         <iscroll-view class="content" @scrollStart="log" ref="iscroll">
            <list></list>
         </iscroll-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import list from "@/components/list.vue";

export default {
  name: "Good",
  components: {
    list,
  },
  data(){
      return{
          showMask:false
      }
  },
  methods: {
      show(bool){
          this.showMask = bool
      },
      demo(){
          console.log(11111);
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
    padding: 0 10px;
  position: absolute;
  top: 164px;
  bottom: 0px;
 background-color: #fff;
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
