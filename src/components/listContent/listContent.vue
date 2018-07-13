<template>
  <div id="listContent">
    <el-button @click="addHandle" type="primary">添加商品</el-button>
    <goods-list></goods-list>
    <add-goods v-if="addShow"></add-goods>
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
      addShow: false
    }
  },
  methods: {
    addHandle: function () {
      this.addShow = true
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

