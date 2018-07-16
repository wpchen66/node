<template>
  <div id="listContent">
    <el-button @click="addHandle" type="primary">添加商品</el-button>
    <goods-list :setAdd="setAdd" v-if="!addShow"></goods-list>
    <add-goods :setAdd="setAdd" v-if="addShow"></add-goods>
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
      addShow: true
    }
  },
  mounted(){
    const _this = this
   this.addShow = this.$store.state.addShow
   this.$set(_this, 'addShow', _this.$store.state.addShow)
  },
  methods: {
    addHandle: function () {
      this.addShow = true;
      this.$store.dispatch('setAddShow', true)
    },
    setAdd: function (show) {
      this.addShow = show
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

