<template>
  <div class="home page">
    <div class="header">
        <h1>商城首页</h1>
    </div>
    <div class="search">
      <input type="text" class="inp" placeholder="请输入关键词" v-model="kw" />
      <span @click="search"><i class="iconfont iconsearch1"></i></span>
    </div>
    <iscroll-view class="content" @scrollStart="log" ref="iscroll">
      <div>
        <div class="swiper-container" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img
                src="https://res.gucci.cn/resources/2020/9/8/15995493224698345_content_HeroRegularMedium_768x386_1599212712_HeroRegularMedium_S03-FS-071_001_Default.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide">
              <img
                src="https://res.gucci.cn/resources/2020/9/8/1599549805110883_content_HeroRegularStandard_1600x675_1599213605_HeroRegularStandard_S03-FS-069_001_Default.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide">
              <img
                src="https://res.gucci.cn/resources//2020/9/7/1599449432133816_content_HeroRegularStandard_1600x675_1596722404_HeroRegularStandard_BloomRevival-Portfolio-hero_001_Default.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide">
              <img
                src="https://res.gucci.cn/resources//2020/6/16/15922869546903693_content_HeroRegularStandard_1600x675_1589884211_HeroRegularStandard_OFFTHEGRID-05_001_Default.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide">
              <img
                src="https://res.gucci.cn/resources/2020/9/9/15996442573617930_content_HeroRegularStandard_1600x675_1599638409_HeroRegularStandard_S03-FS-GGWJ-08_001_Default.jpg"
                alt=""
              />
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="coupon">
        <div class="left">
          <p class="money">￥20</p>
          <p>满100可用</p>
        </div>
        <div class="right">
          <p class="j-s-a">
            <span class="tit">周年庆优惠券</span><span class="get">领取</span>
          </p>
          <p class="time">有效期：2020-12-30</p>
          <p>购物满100即可使用</p>
        </div>
      </div>

     <list :data="recommend">
      <h2 class="j-s-a">优惠推荐</h2>
     </list>
    <list :data="newGood">
      <h2 class="j-s-a">最新出品 <a href="">查看全部</a></h2>
    </list>
    </iscroll-view>
  </div>
</template>

<script>
// @ is an alias to /src
import list from "@/components/list.vue";
import { mapState } from 'vuex';

export default {
  name: "Home",
  components: {
    list,
  },
  data(){
    return {
      kw:''
    }
  },
  methods: {
     search(){
        this.select = '搜索'
        this.offset = 1;
        this.$store.dispatch('good/searchGood',{kw:this.kw,offset:this.offset})
        this.$router.push('/good')
      },
  },
  computed: {
    ...mapState({
     recommend:state => state.good.recommend,
     newGood:state => state.good.new
    })
  },
  created() {
    this.$store.dispatch('user/getAddress')
    this.$store.dispatch('good/getRecommend')
     this.$store.dispatch('good/getNew')
  },
  mounted() {
    this.$nextTick(() => {
      var swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
        },
        autoplay:true,
        loop : true,
      });
    });
  },
};
</script>

<style lang="scss" scoped>

.home {
  padding: 0 10px;
}
.content {
  padding: 0 10px;
  position: absolute;
  top: 94px;
  bottom: 0px;
background-color: #f2f2f2;
  left: 0;
  right: 0;
  overflow: hidden;
}
.search {
  height: 40px;
  width: 100%;
  display: flex;
  overflow: hidden;
  border: 1px #ccc solid;
  input {
    height: 40px;
    border: none;
    outline: none;
    display: block;
  }
  .inp {
    width: 300px;
    font-size: 18px;
    text-indent: 15px;
  }
  span {
    flex: 1;
    height: 40px;
    background-color: #fff;
    i {
      font-size: 30px;
      line-height: 40px;
    }
  }
}
.swiper-container {
  height: 180px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 15px;
  .swiper-wrapper {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.coupon {
  margin-top: 20px;
  height: 110px;
  border-radius: 10px;
  background-color: #ed3f14;
  display: flex;
  padding: 15px 10px;
  align-items: center;
  justify-content: space-around;

  .left {
    color: #fff;
    font-size: 13px;
    .money {
      font-size: 28px;
      margin-bottom: 5px;
    }
  }
  .right {
    margin-left: 10px;
    padding: 10px;
    background-color: #fff;
    height: 80px;
    width: 250px;
    border-radius: 10px;
    .tit {
      font-size: 15px;
      color: #333;
    }
    p {
      text-align: left;
      font-size: 14px;
      color: #777;
    }
    .time {
      color: #555;
      margin: 0px 0 5px 0;
    }
    .get {
      text-align: center;
      width: 60px;
      height: 30px;
      border-radius: 5px;
      line-height: 30px;
      background-color: #ed3f14;
      color: #fff;
      font-size: 15px;
    }
  }
}
</style>
