<template>
  <div id="addClassify">
      <el-form ref="form" :rules="rules" :model="classifyForm" label-position="left"  label-width="120px">
          <el-form-item label="分类名称:">
            <el-input v-model="classifyForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机分类名称:">
            <el-input v-model="classifyForm.mobilename"></el-input>
          </el-form-item>
          <el-form-item  label="上级分类名称:">
             <el-select v-model="classifyForm.firstClassify"  placeholder="选择顶级分类">
            </el-select>
            <el-select v-model="classifyForm.secClassify" placeholder="选择二级分类">
            </el-select>
          </el-form-item>
          <el-form-item label="导航栏是否显示:">
            <el-switch v-model="classifyForm.isShow"></el-switch>
          </el-form-item>
          <el-form-item label="分类背景颜色:">
            <el-input v-model="classifyForm.color"></el-input>
          </el-form-item>
          <el-form-item label="分类排序:">
            <el-input v-model="classifyForm.sort"></el-input>
          </el-form-item>
          <el-form-item label="分类图片:" prop="classifyImg">
            <el-upload
              class="upload"
              action="string"
              :multiple="false"
              ref="uploadfile"
              :before-upload="beforeInfo"
              :on-change="changeHandle"
              :auto-upload="false"
              list-type="picture-card"
              :on-remove="removeImg"
              :limit="limit"
              :file-list="uploadList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-button class="submit" type="primary" @click.prevent="onSubmit">立即创建</el-button>
      </el-form>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  Upload,
  Dialog,
  Button
} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Button)
export default {
  data(){
    return{
      classifyForm:{
        name:"",
        mobilename:"",
        firstClassify:"",
        secClassify:"",
        tirClassify:"",
        isShow: true,
        color: '',
        sort: 0
      },
      upload: {
        name: ""
      },
        uploadList: [],
        limit:1,
        removeList:"",
        dialogVisible: false,
        dialogImageUrl: null,
        index: 0,
        rules:{
          classifyImg: []
        }
    }
  },
  methods: {
    removeImg: function(file, files) {
      this.removeList=(file["url"]);
      console.log(this.removeList, 22222);
    },
    changeHandle: function(file, filelist) {
      console.log(file, filelist)
      this.uploadList = filelist;
    },
    beforeInfo: function(item) {
      this.upload.append(this.index, item);
      this.index++;
      return false;
    },
    onSubmit: function(){
      this.upload = new FormData();
        new Promise((resolve, reject) => {
          this.$refs.uploadfile.submit();
          resolve();
        }).then(data => {
          this.from = JSON.stringify(this.classifyForm);
          this.upload.append("form", this.from);
          console.log(this.upload);
          this.$http({
            method: "POST",
            url: "/api/addClassify",
            data: this.upload
          }).then(res => {
            console.log(res);
            this.index = 0;
          });
          this.setAdd(false);
        });
    }
  }
};
</script>
<style>
</style>

