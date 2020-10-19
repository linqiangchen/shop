<template>
  <div id="home">
  
  <div class="show j-s-a">
   <div v-for="(item ,index ) in  showData " :key="index" class="item">
      <h1>{{item.titTop}}</h1>
      <div class="newData j-s-a">
      <a-icon :type="item.icon" />
      <span> {{item.newNum}} </span>
      </div>
       <div class="oldData j-s-a">
      <span> {{item.titBottom}} </span>
      <span> {{item.newNum}} </span>
      </div>
   </div>
  </div>
  
    <router-view></router-view>
  </div>
</template>

<script>
const data = [
  {
    titTop:'今日订单',
    icon:"file-protect",
    newNum:200,
    oldNum:100,
    titBottom:'昨日订单'
  },
  {
    titTop:'今日销售额',
    icon:"pay-circle",
    newNum:200,
    oldNum:100,
    titBottom:'昨日销售额'
  }
  ,
  {
    titTop:'今日新增用户',
    icon:"user",
    newNum:200,
    oldNum:100,
    titBottom:'昨日新增用户'
  },
  {
    titTop:'今日浏览量',
    icon:"rise",
    newNum:200,
    oldNum:100,
    titBottom:'昨日浏览量'
  }
]
export default {
    data(){
      return {
        showData:data
      }
    }
}
</script>

<style scoped lang="scss">
  #home{
    position: relative;
  }

  .show{
    display: flex !important ;
  }
  .item{
    width: 280px;
    height: 150px;
    padding: 15px;
    background: red;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    color:#fff;
    h1{
      color:#fff;
    }
    .newData{
      font-size: 28px;
    }
  }
  .item:nth-child(1){
    background: #2D8CF0;
    box-shadow: 0 0 10px #2D8CF0;
  }
  .item:nth-child(2){
    background: #FF7289;
    box-shadow: 0 0 10px #FF7289;
  }
  .item:nth-child(3){
    background: #00E0C3;
    box-shadow: 0 0 10px #00E0C3;
  }
  .item:nth-child(4){
    background: #FFB857;
    box-shadow: 0 0 10px #FFB857;
  }
</style>