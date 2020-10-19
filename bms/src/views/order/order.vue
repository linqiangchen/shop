
<template>
  <div id="home">
  
    <div class="table">
       <table class="table table-hover">
    <thead>
      <tr>
      <th v-for="item in columns" :key="item.title">{{item.title}}</th>
      </tr>
    </thead>
   <tbody>
      <tr v-for="(item) in order" :key="item._id">
      <td><input type="checkbox" name="" id=""> {{item.id}}</td>
      <td><div class="info j-s-a">
      <img :src="item.good.img" alt="">
      <div class="right">
      <p>{{item.good.title}}</p>
      <p>{{item.sku}}</p>
      </div>
      </div></td>
      <td> {{item.good.price}}</td>
      <td> {{item.count}}</td>
      <td> {{item.price}}</td>
      <td> <p>{{item.user.name}}</p><p>{{item.user.user}}</p></td>
      <td> {{item.state}}</td>
      <td> {{item.time}}</td>

      <td> <a  @click="remove(item._id)">查看详情</a> <a @click="send(item._id)" v-if="item.state === '待发货'">发货</a><a @click="send(item._id)" v-if="item.state === '待收货'">物流</a> <a >取消</a></td>
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
const columns = [
    {
    title: '订单编号',
  },
    {
    title: '商品',
  },
  {
    title: '单价', 
  },
  {
    title: '数量',
  },
   {
    title: '金额',
  },
   {
    title: '用户',
  },

   {
    title: '状态',
  },
   {
    title: '创建时间',
  },
  {
    title: '操作',
  },
];
import { mapState } from 'vuex';
import axios from 'axios'
export default {

  name:'order',
  data(){
    return {
      columns,
      offset:1
    }
  },
  computed: {
    ...mapState({
      order:state=>state.order.order,
      count:state => Math.ceil(state.order.count/7) 
    })
  },
  methods: {
    handleOffset(index){
      this.offset = index;
         this.$store.dispatch('order/getOrder',this.offset)
    },
    send(id){
      axios.get('/api/order/updateOrderState?id='+ id + '&state=待收货').then(res =>{
            //   this.$router
     this.$store.dispatch('order/getOrder',this.offset)
          })
    }
  },
    created() {
    this.$store.dispatch('order/getOrder')
  },
}
</script>

<style lang="scss" scoped>
  .info{
    width: max-content;
    img{
 width: 50px;
 height: 50px;
    }
   
  }
  .table{
    td{
      vertical-align: middle;
      padding: 4px;
      p{
        margin: 0;
      }
    }
  }
</style>