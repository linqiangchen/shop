<template>
  <div class="sub">
    <div class="header">
      <p>
        <i class="iconfont iconzuo" @click="back"></i>
        修改头像
      </p>
    </div>
    <van-uploader :after-read="afterRead" v-model="fileList" multiple/>
  </div>
</template>

<script>
import Vue from 'vue';
import { Uploader } from 'vant';
import axios from 'axios'
Vue.use(Uploader);
export default {
     data() {
    return {
      fileList: [
   
      ],
    };
  },
  methods: {
    afterRead(file) {
        console.log('file: ', file);
      // 此时可以自行将文件上传至服务器
      const formData = new FormData();  // 声明一个FormData对象
	      formData.append("file", file.file);//通过append向form对象添加数据
        axios.post('/api/user/updateAvatar',formData, {
	            headers: {
	              "content-type": "multer/form-data"
	            }
	          }).then((res)=>{
         this.$router.replace('/mine/userInfo')
                 this.$store.dispatch('user/getInfo')
        })

    },
  },
};
</script>

<style>
</style>