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

Vue.use(AddressList);
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号',
        },
      ],
    };
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