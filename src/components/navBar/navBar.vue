<template>
  <div id="navBar">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
     <el-menu-item index="1">
        <router-link to="/index/goodslist">
          <i class="el-icon-tickets"></i>
          <span>商品列表</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/index/classifylist">
          <i class="el-icon-tickets"></i>
          <span>添加商品分类</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/index/brandlist">
          <i class="el-icon-tickets"></i>
          <span>品牌列表</span>
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  RadioButton,
  RadioGroup
} from "element-ui";
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(RadioButton);
Vue.use(RadioGroup);
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
  position: absolute;
  left: 0;
  top: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
a{
  color: #909399;
  display: block
}
a:hover{
  color: #409EFF
}
#navBar .active{
  color: #409EFF
}
</style>

