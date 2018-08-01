<template>
  <div id="addBrand">
    <h2>添加品牌</h2>
    <el-form ref="form" :rules="rules" :model="form" label-position="left"  label-width="120px">
      <el-form-item label="品牌名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="品牌网址:">
        <el-input v-model="form.website"></el-input>
      </el-form-item>
    <el-form-item label="品牌分类">
      <el-select >
        <option value=""></option>
        <template v-if="firClass.length">
          <option value=""></option>
        </template>
      </el-select>
      <el-select>
        <option value=""></option>
        <template v-if="secClass.length">
          <option value=""></option>
        </template>
      </el-select>
      <el-select>
        <option value=""></option>
        <template v-if="tirClass.length">
          <option value=""></option>
        </template>
      </el-select>
    </el-form-item>
     <el-form-item label="排序:">
        <el-input v-model.number="form.sort"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo">
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
import Vue from "vue";
import {
  Form,
  Input,
  Button,
  Message,
  FormItem,
  Select,
  Option,
  Upload,
  Dialog
} from "element-ui";
export default {
  data() {
    return {
      form: {
        name: "",
        sort: 0,
        website: ""
      },
      firClass: [],
      secClass: [],
      tirClass: [],
      rules: {},
      upload: {
        name: ""
      },
      uploadList: [],
      limit: 1,
      removeList: "",
      dialogVisible: false,
      dialogImageUrl: null,
      index: 0
    };
  },
  methods: {
    beforeInfo: function(item) {
      this.upload.append(this.index, item);
      return false;
    },
    removeImg: function(file, files) {
      this.removeList = file["url"];
    },
    changeHandle: function(file, filelist) {
      this.uploadList = filelist;
    },
    onSubmit: function(){
       this.upload = new FormData();
       this.$refs.uploadfile.submit();

      let form = JSON.stringify(this.form)
      console.log(form)
      this.upload.append('form', form)
      this.$http({
        method: 'POST',
        url: '/api/addBrand',
        data: this.upload
      }).then(res => {
        console.log(res)
      })
    }
  }
};
</script>
<style>
</style>
