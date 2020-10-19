
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
          <tr v-for="(item, index) in userList" :key="item._id">
            <td>{{ index - 6 + offset * 7 }}</td>
            <td>
              <img :src="item.avatar" alt="" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.user }}</td>
            <td>{{ item.location }}</td>
            <td><p>正常</p></td>
            <td>{{ item.birth }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.createTime }}</td>
            <td><a @click="remove(item._id)">编辑</a></td>
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
    title: "头像",
  },
  {
    title: "昵称",
  },
  {
    title: "手机",
  },
  {
    title: "区域",
  },

  {
    title: "状态",
  },
  {
    title: "生日",
  },
  {
    title: "性别",
  },

  {
    title: "注册时间",
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
      userList: (state) => state.vip.userList,
      count: (state) => Math.ceil(state.vip.count / 7),
    }),
  },
  methods: {
    handleOffset(index) {
      this.offset = index;
      this.$store.dispatch("vip/getUser", this.offset);
    },
    send(id) {
      axios
        .get("/api/order/updateOrderState?id=" + id + "&state=待收货")
        .then((res) => {
          //   this.$router
          this.$store.dispatch("order/getOrder", this.offset);
        });
    },
  },
  created() {
    this.$store.dispatch("vip/getUser");
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