<template>
  <div class="edit sub">
  <div class="header">
    <p>
    <i class="iconfont iconzuo" @click="back"></i>
    新增地址
    </p>
</div>
    <van-address-edit
  :area-list="areaList"
  show-postal
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/>
  </div>
</template>

<script>
import Vue from 'vue';
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);
import areaList from '../../../public/data/area'
import { Toast } from 'vant';
export default {
    name:'Edit',
     data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    onSave() {
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
}
</script>

<style scoped lang="scss">

 
</style>