<template>
  <div class="classify">
    <!-- accordion -->
    <el-tree ref="tree" :data="data"  node-key="id" :render-content="renderContent" default-expand-all :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
import Vue from "vue";
import { Tree, Message } from "element-ui";
Vue.use(Tree);
export default {
  props: {
    setAdd: Function
  },
  data() {
    return {
      data: [],
      firstClassify: "",
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.$http({
      type: "GET",
      url: "/api/getFirClassify"
    }).then(res => {
      let data = res.data.data;
      data.forEach((item, index) => {
        let info = item;
        info.level = 1;
        let obj = {
          label: item.name,
          id: item["_id"],
          info
        };
        this.data.push(obj);
      });
    });
  },
  methods: {
    handleNodeClick: function(val, Node) {
      if (val.children || Node.level === 3) {
        return;
      }
      let secList = [];
      if (Node.level === 1) {
        this.$http({
          type: "GET",
          url: "/api/getSecClassify",
          params: {
            firstClassify: val.id
          }
        }).then(res => {
          console.log(res);
          let data = res.data.data;
          data.forEach(function(item, index) {
            let obj = {};
            obj.id = item["_id"];
            obj.label = item["name"];
            obj.info = item;
            obj.info.level = 2;
            secList.push(obj);
          });
          this.$refs.tree.updateKeyChildren(val.id, secList);
        });
      } else if (Node.level === 2) {
        this.$http({
          type: "GET",
          url: "/api/getTirClassify",
          params: {
            secClassify: val.id
          }
        }).then(res => {
          let data = res.data.data;
          data.forEach(function(item, index) {
            let obj = {};
            obj.id = item["_id"];
            obj.label = item["name"];
            obj.info = item;
            (obj.info.level = 3),
              (obj.info.firClssifyId = Node.data.info.firClssifyId);
            secList.push(obj);
          });
          console.log();
          this.$refs.tree.updateKeyChildren(val.id, secList);
        });
      }
    },
    renderContent: function(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.getNode(data)}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    getNode: function(data) {
      console.log(data.info);
      this.$store.dispatch("setClassifyInfo", data.info);
      this.setAdd(true);
    },
    remove(node, data) {
      console.log(node, data);
      this.$http({
        type: "GET",
        url: "/api/removeClassify",
        params: {
          classifyInfo: data.info
        }
      }).then(res => {
        Message.success({
          message: res.data.message
        })
        this.$http({
          type: "GET",
          url: "/api/getFirClassify"
        }).then(res => {
          this.data = [];
          let data = res.data.data;
          data.forEach((item, index) => {
            let info = item;
            info.level = 1;
            let obj = {
              label: item.name,
              id: item["_id"],
              info
            };
            this.data.push(obj);
          });
        });
      });
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

