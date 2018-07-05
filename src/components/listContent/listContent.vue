<template>
  <div id="listContent">
    <el-button type="primary">添加商品</el-button>
    <goods-list></goods-list>
    <add-goods></add-goods>
  </div>
</template>
<script>
import Vue from 'vue'
import GoodsList from '../goodsList/goodsList';
import AddGoods from '../addGoods/addGoods';
import {Button} from 'element-ui'
Vue.use(Button)
export default {
  data () {
    return {

    }
  },
  components: {
    GoodsList,
    AddGoods
  }
}
</script>
<style>
</style>

