<template>
  <div id="goodsList">
    <h2>商品列表</h2>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="_id"
      label="商品Id"
      width="300">
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="des"
      label="商品描述"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      width="120">
    </el-table-column>
    <el-table-column
     
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Table,
  TableColumn,
  Button,
} from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
export default {
  props:{
    setAdd:{
      type: Function
    }
  },
  data() {
    return {
      goodsList: null,
      tableData: [],
    };
  },
  mounted() {
    this.$http({
      url: "/api/getGoodsList",
      method: "GET"
    }).then(data => {
      console.log(data);
      const goodsList = data.data.data
      this.tableData = goodsList
    });
    
  },
  methods: {
    handleClick: function(ev){
      this.setAdd(true)
      this.$store.dispatch('setGoodsInfo', ev)
    }
  }
};
</script>
<style>
</style>

