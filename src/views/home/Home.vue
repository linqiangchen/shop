<template>
  <div class="home page">
    <div class="header">
        <h1>商城首页</h1>
    </div>
    <div class="search">
      <input type="text" class="inp" placeholder="请输入关键词" />
      <span><i class="iconfont iconsearch1"></i></span>
    </div>
    <iscroll-view class="content" @scrollStart="log" ref="iscroll">
      <div>
        <div class="swiper-container" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img
                src="http://p4.music.126.net/arTjzcQnO6iChdJPSLKt7g==/109951163568667244.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide">
              <img
                src="http://p3.music.126.net/9JEWZ5bFWiVkaleYtn7X5Q==/109951164500007635.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide">
              <img
                src="http://p4.music.126.net/S-ALyDLWPk4NfLjbs8fB2A==/109951164722036328.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide">
              <img
                src="http://p3.music.126.net/MSh8GMAZOrsp8H-9d1aKzw==/18600438209269609.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide">
              <img
                src="http://p4.music.126.net/7jJXXMyzAHsMy0ZJIDxVxw==/109951165145898235.jpg"
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
          <p class="time">有效期：2020-09-30</p>
          <p>购物满100即可使用</p>
        </div>
      </div>

     <list>
      <h2 class="j-s-a">优惠推荐</h2>
     </list>
    <list>
      <h2 class="j-s-a">最新出品 <a href="">查看全部</a></h2>
    </list>
    </iscroll-view>
  </div>
</template>

<script>
// @ is an alias to /src
import list from "@/components/list.vue";

export default {
  name: "Home",
  components: {
    list,
  },
  methods: {
    log(e) {
      e.refresh();
    },
  },
  mounted() {
    this.$nextTick(() => {
      var swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
        },
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
  top: 84px;
  bottom: 0px;

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
