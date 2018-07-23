<template>
  <div class="classify">
    <el-tree :data="data" accordion node-key="id" :render-content="renderContent" default-expand-all :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Tree
} from 'element-ui'
Vue.use(Tree)
export default {
  data(){
    return {
      data: [],
      defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  mounted(){
     this.$http({
      type: "GET",
      url: "/api/getFirClassify"
    }).then(res => {
      let data = res.data.data
      data.forEach((item, index) => {
          let obj = {
            label: item.name,
            id: item['_id']
          }
          this.data.push(obj)
      });
    });
  },
  methods:{
    handleNodeClick: function(){},
    renderContent: function(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>修改</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      }
  }
};
</script>
<style>
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

