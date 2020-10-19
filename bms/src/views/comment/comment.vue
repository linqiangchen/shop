
<template>
  <div id="home">
    <div class="table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="item in columns" :key="item.title">{{ item.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in comment" :key="item._id">
            <td>{{ index - 6 + offset * 7 }}</td>
            <td>
              {{ item.con }}
            </td>
             <td>
              {{ item.star }}
            </td>
            <td>{{ item.goodID.title }}</td>
            <td>通过</td>
            <td><img :src="item.user.avatar"/>{{item.user.name}}</td>
            <td><p>{{item.time}}</p></td>
      
            <td><a @click="remove(item._id)">联系</a></td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="...">
        <ul class="pagination">
          <li class="disabled">
            <a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
          </li>
          <li
            :class="{ active: item === offset }"
            v-for="item in count"
            :key="item"
            @click="handleOffset(item)"
          >
            <a>{{ item }}<span class="sr-only">(current)</span></a>
          </li>
          <li>
            <a aria-label="Next">
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
    title: "编号",
  },
  {
    title: "评价内容",
  },
  {
    title: "评价星级",
  },
  {
    title: "商品名称",
  },
  {
    title: "状态",
  },
  {
    title: "用户",
  },

  {
    title: "发布时间",
  },
  {
    title: "操作",
  },
 
];
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "order",
  data() {
    return {
      columns,
      offset: 1,
    };
  },
  computed: {
    ...mapState({
      comment: (state) => state.comment.comment,
      count: (state) => Math.ceil(state.comment.count / 7),
    }),
  },
  methods: {
    handleOffset(index) {
      this.offset = index;
      this.$store.dispatch("comment/getComment", this.offset);
    },
   
  },
  created() {
    this.$store.dispatch("vip/getUser");
    this.$store.dispatch("comment/getComment");
  },
};
</script>
<style lang="scss" scoped>
td {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.table {
  td {
    vertical-align: middle;
    padding: 4px;
    p {
      margin: 0;
    }
  }
}
</style>