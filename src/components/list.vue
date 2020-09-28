<template>
      <div class="recommend">
        <slot></slot>
        <ul>
          <li v-for="item in 16" :key="item">
            <img
              src="http://p4.music.126.net/S-ALyDLWPk4NfLjbs8fB2A==/109951164722036328.jpg"
              alt=""
            />
            <p class="tit">【硬核守护】12星座守护项链 s925纯银</p>
            <p class="j-s-a">
              <span class="now">￥168</span><span class="old seale">10人付款</span>
            </p>
          </li>
        </ul>
      </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.recommend {
  background-color: #f5f7f8;

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
    background-color: #fff;
    li {
      width: 175px;
      margin-bottom: 10px;
      background-color: #fff;
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