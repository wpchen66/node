<template>
  <div id="brandList">
     <el-button @click="addHandle" type="primary">添加品牌</el-button>
    <brand v-if="!addShow"></brand>
    <add-brand
    v-if="addShow"
    :setAdd="setAdd"
    ></add-brand> 
  </div>
</template>
<script>
import Brand from 'com/brand/brand'
import AddBrand from 'com/addBrand/addBrand'
import {
  Button
} from 'element-ui'
export default {
  data(){
    return {
      addShow: false
    }
  },
  methods:{
    setAdd: function(addShow){
      this.addShow = addShow
    },
    addHandle: function(){
      this.addShow = true
    }
  },
  components:{
    Brand,
    AddBrand
  }
}
</script>
<style>

</style>
