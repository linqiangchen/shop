<template>
  <div class="sub">
    <div class="header">
      <p>
        <i class="iconfont iconzuo" @click="back"></i>
        修改生日
      </p>
    </div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm ="handle"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { DatetimePicker } from "vant";
Vue.use(DatetimePicker);
import axios from 'axios'
export default {
  data() {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
    };
  },
  methods: {
    
      format(date, fmt) {
        //author: meizz
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          S: date.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      },
      handle(){
          console.log(new Date(this.currentDate).getDate());
          axios.get('/api/user/updateBirth?birth=' + this.format(new Date(this.currentDate),"yyyy-MM-dd")).then((res)=>{
                this.$toast(res.data.msg)
                this.$router.replace('/mine/userInfo')
                 this.$store.dispatch('user/getInfo')
            })
      
    },
  },
};
</script>

<style>
</style>