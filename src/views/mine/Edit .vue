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
import axios from 'axios'
export default {
    name:'Edit',
     data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    onSave(address) {
      Toast('save');

//       addressDetail: (...)
// areaCode: (...)
// city: "大同市"
// country: ""
// county: "平城区"
// isDefault: true
// name: "212"
// postalCode: "578578"
// province: "山西省"
// tel: "13766345195"
axios.post('/api/user/addAddress',{
  name:address.name,
  phone:address.tel,
  location:address.province + address.city + address.county,
  detail:address.addressDetail,
  Postcode:address.postalCode,
  isDefault:address.isDefault
}).then((res)=>{
  console.log(res);
})
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