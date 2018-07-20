<template>
  <div id="classify">
    <el-button @click="addHandle" type="primary">添加分类</el-button>
    <add-classify
    v-if="addShow"
    >
    </add-classify>
    <classify
      v-if="!addShow"
    ></classify>     
  </div>
</template>
<script>
import Vue from 'vue'
import AddClassify from 'com/addClassify/addClassify'
import Classify from 'com/classify/classify'
import {Button} from 'element-ui'
export default {
  data(){
    return{
      addShow: false
    }
  },
  methods: {
    addHandle: function(){
      this.addShow = true
    }
  },
  components:{
    AddClassify,
    Classify
  }
}
</script>
<style>
</style>

