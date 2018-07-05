<template>
  <div id="navBar">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
     <el-menu-item index="1">
        <i class="el-icon-tickets"></i>
        <span slot="title">商品列表</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  RadioButton,
  RadioGroup,

} from 'element-ui'
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(RadioButton)
Vue.use(RadioGroup)
export default {
  data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>
<style>
#navBar {
  position: absolute; left: 0; top: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
  }
</style>

