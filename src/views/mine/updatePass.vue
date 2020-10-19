<template>
  <div class="sub">
    <div class="header">
      <p>
        <i class="iconfont iconzuo" @click="back"></i>
        修改密码
      </p>
    </div>

    <div class="wrap">
      <div class="inp j-s-a">
        <label for="">旧密码：</label
        ><input type="password" v-model="oldPass" />
      </div>
      <div class="inp j-s-a">
        <label for="">新密码：</label
        ><input type="password" v-model="newPass" />
      </div>
      <div class="inp j-s-a">
        <label for="">确认密码：</label
        ><input type="password" v-model="repactPass" />
      </div>
      <div class="btn" @click="updateName">保存</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { Dialog } from "vant";
export default {
  name: "updatePass",
  data() {
    return {
      oldPass: "",
      newPass: "",
      repactPass: "",
    };
  },
  computed: {
    ...mapState({
      info: (state) => state.user.info,
    }),
  },
  created() {},
  methods: {
    updateName() {
      if (
        !this.oldPass.trim() ||
        !this.newPass.trim() ||
        !this.repactPass.trim()
      ) {
        this.$toast("密码不能为空");
        return;
      }
      if (this.newPass !== this.repactPass) {
        this.$toast("两次密码不一致");
        return;
      }
      axios
        .get(
          "/api/user/updatePass?newPass=" +
            this.newPass +
            "&oldPass=" +
            this.oldPass
        )
        .then((res) => {
          this.$toast(res.data.msg);
          if (res.data.code === 0) {
            Dialog.alert({
              message: "修改成功，请重新登录",
            }).then(() => {
                axios.get('/api/user/logout')
           this.$router.replace('/login')
            });
          }
         
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.wrap {
  padding: 15px;
  .inp {
    margin: 10px 0;
    width: 100%;
    height: 45px;
    padding: 0 15px;
    overflow: hidden;
    border: 1px #ccc solid;
  }
  label {
    width: 80px;
    height: 45px;
    line-height: 45px;
    text-align-last: justify;
  }
  input {
    flex: 1;
    height: 45px;
    border: none;
    outline: none;
    font-size: 16px;
    text-indent: 5px;
  }

  .btn {
    margin: 20px auto;
    border-radius: 10px;
    width: 150px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #fff;
    background-color: #2d8cf0;
  }
}
</style>