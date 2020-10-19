<template>
      <div class="recommend">
      <div class="tit">
        <slot></slot>
        </div>
        <ul>
          <li v-for="(item ,index) in data" :key="index" @click="link(item)">
            <img
              :src="item.img"
              alt=""
            />
            <p class="tit">{{item.title}}</p>
            <p class="j-s-a">
              <span class="now">￥{{item.price}}</span><span class="old seale">{{item.sale}}人付款</span>
            </p>
          </li>
        </ul>
      </div>
</template>

<script>
export default {
  props:{
     data:{
       type:Array
     }
  },
  methods: {
    link(item){
      this.$store.commit('good/setCurGood',item)
      this.$store.dispatch('good/getComment',item._id)
      this.$router.push({name:'detail'})
    }
  },
}
</script>

<style lang="scss" scoped>
.recommend {
   background-color: #f2f2f2;

  text-align: left;

  h2 {
    background-color: #fff;
    text-align: left;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
   
    a {
      font-size: 14px;
      color: #2d8cf0;
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #f2f2f2;
     
    li {
      width: 49%;
      padding: 10px;
      margin-bottom: 10px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 5px 5px 10px #ccc;
      img {
        width: 100%;
        height: 125px;
      }
      .tit {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin: 15px 0;
      }
      .now {
        font-size: 22px;
        color: #ed3f14;
      }
      .old {
        font-size: 18px;
        color: #999;
        text-decoration: line-through;
      }
      .seale{
        text-decoration: none;
      }
    }
  }
}

</style>