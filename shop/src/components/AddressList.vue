<template>
<div class="sub">
<div class="header">
    <p>
    <i class="iconfont iconzuo" @click="back"></i>
    选择地址
    </p>
</div>
  <van-address-list
  v-model="chosenAddressId"
  :list="list"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
/></div>
</template>
<script>
import { Toast } from 'vant';
import Vue from 'vue';
import { AddressList } from 'vant';
import { mapState } from 'vuex';

Vue.use(AddressList);
export default {
  data() {
    return {
      chosenAddressId: '1',
    };
  },
  computed: {
    ...mapState({
      list:(state)=>state.user.address.map((item ,index) => ({
        id:index,
        name:item.name,
        tel:item.phone,
        address:item.location + item.detail,
        _id:item._id
      }))
    })
  },
  watch: {
    address(neeVal){
      this.list = this.address.map((item ,index) => ({
        id:index,
        name:item.name,
        tel:item.phone,
        address:item.location + item.detail,
        _id:item._id
      }))
    },
    chosenAddressId(newVal){
      this.$store.commit('user/setSelectAddress',this.list[newVal])
      this.$router.back()
    }
  },
  methods: {
    onAdd() {
      this.$router.push('/mine/addressEdit')
    },
    onEdit(item, index) {
      Toast('编辑地址:' + index);
    },
  },
};
</script>
<style scoped lang="scss">
  .sub{
      .header{
          p{
              padding: 0 15px;
              text-align: left;
              i{
                  font-size: 16px;
              }
          }
      }
  }
</style>