<template>
  <div id="home " class="good">
  <div class="header j-s-a">
  <div class="left">
    <label for="">商品名称</label>
    <input type="text" placeholder="请输入商品名称" v-model="kw">
    <span class="btn" @click="search">搜索</span>
  </div>
  <div class="right">
    <span class="btn" @click="$router.push({name:'addAccount'})">添加</span>
  </div>
  </div>

  <div class="table">
    <table class="table table-hover">
    <thead>
      <tr>
      <th v-for="item in columns" :key="item.title">{{item.title}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in good" :key="item._id">
      <td> {{index - 6 + offset*7}}</td>
      <td><img :src="item.img" alt=""></td>
      <td> {{item.title}}</td>
      <td> {{item.price}}</td>
      <td> {{item.classify}}</td>
      <td> {{item.count}}</td>
      <td> {{item.sale}}</td>
      <td> {{item.state}}</td>
      <td> {{item.publisher}}</td>
      <td> {{item.time}}</td>
      <td> <a  @click="remove(item._id)">删除</a> <a >下架</a> <a >上架</a></td>
      </tr>
    
    </tbody>
    </table>
    <nav aria-label="...">
  <ul class="pagination">
    <li class="disabled"><a  aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
    <li :class="{active:item === offset}" v-for="item in count" :key="item" @click="handleOffset(item)"><a >{{item }}<span class="sr-only">(current)</span></a></li>
      <li>
      <a  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
  </div>
   
  </div>
</template>

<script>
import Vue from "vue";
import main from '../../router/module/mainRouter'
import { Table, Menu, Icon, Breadcrumb } from "ant-design-vue";
import { mapState } from 'vuex';
import axios from 'axios'
Vue.use(Table);
const columns = [
    {
    title: '商品编号',
  },
    {
    title: '封面图',
  },
  {
    title: '商品名称', 
  },
  {
    title: '价格',
  },
   {
    title: '分类',
  },
   {
    title: '库存',
  },
   {
    title: '销量',
  },
   {
    title: '状态',
  },
   {
    title: '发布者',
  },
   {
    title: '发布时间',
  },
  {
    title: '操作',
  },
];

 
export default {
  data() {
    return {
      columns,
      offset:1,
      kw:'',
      type:-1
    };
  },
  methods: {
    handleOffset(index){
      this.offset = index;
      if(this.type === -1){
         this.$store.dispatch('good/getGood',this.offset)
      }else{
          this.$store.dispatch('good/searchGood',{kw:this.kw,offset:this.offset})
      }
    }
,
    remove(id){
      axios.get('/api/good/removeGood?_id=' + id).then((res)=>{
        console.log(res);
      })
    },
    search(){
      this.type = 'search'
      this.offset = 1
      this.$store.dispatch('good/searchGood',{kw:this.kw,offset:this.offset})
    }

  },
    created() {
    this.$store.dispatch('good/getGood')
  },
  computed: {
    ...mapState({
      good:state => state.good.good,
       count:state => Math.ceil(state.good.count/7) 
    }),
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
      margin-top: 20px;
      img{
        width: 50px;
        height: 50px;
      }
      td{
        vertical-align: middle;
        padding: 2px;
      }
    }
    .good{
      overflow: auto;
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