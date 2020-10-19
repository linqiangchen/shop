<template>
  <div id="home">
  <div class="header j-s-a">
  <div class="left">
    <label for="">账号/姓名</label>
    <input type="text">
    <span class="btn">搜索</span>
  </div>
  <div class="right">
    <span class="btn" @click="$router.push({name:'addAccount'})">添加</span>
  </div>
  </div>

  <div class="table">
     <a-table :row-selection="rowSelection" :columns="columns" :data-source="accountList">
    <a slot="name" slot-scope="text">{{ text }}</a>
  </a-table>
  </div>
   
  </div>
</template>

<script>
import Vue from "vue";
import main from '../../router/module/mainRouter'
import { Table, Menu, Icon, Breadcrumb } from "ant-design-vue";
import { mapState } from 'vuex';
Vue.use(Table);
const columns = [
  {
    title: '员工编号',
    dataIndex: 'key',
    scopedSlots: { customRender: 'name' },
  },
    {
    title: '账号',
    dataIndex: 'user',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '手机',
    dataIndex: 'phone',
  },
   {
    title: '职位',
    dataIndex: 'job',
  },
   {
    title: '权限',
    dataIndex: 'auth',
  },
   {
    title: '添加时间',
    dataIndex: 'time',
  },
   {
    title: '操作',
    dataIndex: 'edit',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    user:'admin',
    phone:13766345195,
    age: 32,
    address: 'New York No. 1 Lake Park',
    job:'主管',
    auth:'商品管理/订单管理',
    time:'2020-09-05 9:00',
    edit:'编辑',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    time:'2020-09-05 9:00',
    phone:13766345195,
    auth:'商品管理/订单管理',
     user:'admin',
    address: 'London No. 1 Lake Park',
    job:'主管',
    edit:'编辑',
  },
  {
    key: '3',
    name: 'Joe Black',
    phone:13766345195,
    time:'2020-09-05 9:00',
    age: 32,
     user:'admin',
    address: 'Sidney No. 1 Lake Park',
    job:'主管',
    auth:'商品管理/订单管理',
    edit:'编辑',
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    time:'2020-09-05 9:00',
     user:'admin',
     phone:13766345195,
     edit:'编辑',
    address: 'Sidney No. 1 Lake Park',
    job:'主管',
    auth:'商品管理/订单管理'
  },
 
];
export default {
  data() {
    return {
      data,
      columns,
    };
  },
    created() {
    
    this.$store.dispatch('account/getAccount')
  },
  computed: {
    ...mapState({
      account:state => state.account.account
    }),
    accountList(){
      let arr = JSON.parse(JSON.stringify(this.account))
        arr.forEach(item => {
          item.edit = '编辑'
        item.auth =   item.auth.map(auth => {
            let title = ''
            main.children.forEach(router => {
              if(router.name === auth){
                title = router.meta.title
              }else if(router.meta.hasSub){
                const result = router.children.find(sub => sub.name === auth)
                if(result){
                  title = result.meta.title
                }
              }
            })
            
            return title
            
            
          }).join(' / ')
        })
        return arr
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
    .left{
        display: flex;
        align-items: center;
        input{
            margin:  0 20px;
            border:none;
            border: 1px #ccc solid;
            outline: none;
            height: 30px;
        }
    }
    .table{
      margin-top: 40px;
    }
    .btn{
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 80px;
        border-radius: 10px;
        background-color: #2D8CF0;
        color: #fff;

        text-align: center;
    }
</style>