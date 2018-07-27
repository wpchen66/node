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
             <el-select @change="getSecClassify($event)"   v-model="classifyForm.firstClassify"  placeholder="选择顶级分类">
                <el-option label="选择顶级分类" value="">
                 </el-option>
               <template v-if="firClass.length">
                 <el-option  v-for="item in firClass" :key="item.id" :label="item.name" :value="item['_id']">
                 </el-option>
               </template>
            </el-select>
            <el-select @change="setSecClassify($event)"   no-match-text="无数据" v-model="classifyForm['secClassify']" ref="secSelected"  placeholder="选择二级分类">
               <el-option label="选择二级分类" value="">
                 </el-option>
                 <template v-if="secClass.length">
               <el-option v-for="item in secClass" :key="item.id" :label="item.name" :value="item['_id']">
                </el-option>
                 </template>
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
import Vue from "vue";
// import axios from "axios"
import {
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  Upload,
  Dialog,
  Button,
  Message,
  Loading
} from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Button);
export default {
  props: {
    setAdd: Function
  },
  data() {
    return {
      classifyForm: {
        id: "",
        name: "",
        mobilename: "",
        firstClassify: "",
        secClassify: "",
        tirClassify: "",
        isShow: true,
        color: "",
        sort: 0
      },
      upload: {
        name: ""
      },
      uploadList: [],
      limit: 1,
      removeList: "",
      dialogVisible: false,
      dialogImageUrl: null,
      index: 0,
      rules: {
        classifyImg: []
      },
      firClass: [],
      secClass: []
    };
  },
  created() {
    let classifyInfo = this.$store.state.classifyInfo;
    // id=""
    if (classifyInfo) {
      this.classifyForm = {
        name: classifyInfo.name,
        sort: classifyInfo.sort,
        mobilename: classifyInfo.mobilename,
        isShow: classifyInfo.isShow,
        color: classifyInfo.color,
        id: classifyInfo["_id"],
        level: classifyInfo.level
      };
      if (classifyInfo.level === 1) {
        // this.$set(this.classifyForm, "firstClassify", classifyInfo["_id"]);
      
      } else if (classifyInfo.level === 2) {
        this.$http({
          type: "GET",
          url: "/api/getSecClassify",
          params: { firstClassify: classifyInfo.firClssifyId }
        }).then(data => {
          this.secClass = data.data.data;
        });
        // this.$set(this.classifyForm, "secClassify", classifyInfo["_id"]);
        this.$set(
          this.classifyForm,
          "firstClassify",
          classifyInfo.firClssifyId
        );
      } else if (classifyInfo.level === 3) {
        console.log(classifyInfo)
        this.$http({
          type: "GET",
          url: "/api/getSecClassify",
          params: { firstClassify: classifyInfo.firClssifyId }
        }).then(data => {
          console.log(data,2222
          )
          this.secClass = data.data.data;
        });
        console.log(111)
        // this.$set(this.classifyForm, "tirClassify", classifyInfo["_id"]);
        this.$set(this.classifyForm, "secClassify", classifyInfo.secClssifyId);
         this.$set(this.classifyForm, "firstClassify", classifyInfo.firClssifyId);
      }

      if (classifyInfo.pic) {
        let obj = { url: classifyInfo.pic };
        this.uploadList.push(obj);
        // this.uploadList.push(classifyInfo.pic)
        console.log(typeof this.uploadList);
      }
    }
  },
  mounted() {
    this.$http({
      type: "GET",
      url: "/api/getFirClassify"
    }).then(data => {
      this.firClass = data.data.data;
    });
    // this.$http.get("/api/getFirClassfiy").then(data => {
    //   console.log(data);
    // });
  },
  methods: {
    getSecClassify: function(data) {
      console.log(this.classifyForm.secClassify);
      // if(!this.classifyForm.firstClassify){
      //   return
      // }
      this.$set(this.classifyForm, "secClassify", "");
      this.secClass = [];
      console.log(this.classifyForm.secClassify);
      this.$http({
        type: "GET",
        url: "/api/getSecClassify",
        params: { firstClassify: this.classifyForm.firstClassify }
      }).then(data => {
        this.secClass = data.data.data;
      });
    },
    setSecClassify: function(data) {
      this.classifyForm.secClassify = data;
      console.log(this.classifyForm["secClassify"], 11111, typeof data);
    },
    removeImg: function(file, files) {
      this.removeList = file["url"];
      console.log(this.removeList, 22222);
    },
    changeHandle: function(file, filelist) {
      this.uploadList = filelist;
    },
    beforeInfo: function(item) {
      this.upload.append(this.index, item);
      return false;
    },
    onSubmit: function() {
      let loadingInstance = Loading.service({
        text: "正在提交",
        target: "#addClassify"
      });
      this.upload = new FormData();
      if (!this.classifyForm.id) {
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
            this.$nextTick(() => {
              loadingInstance.close();
              Message.success({
                message: res.data.message
              });
            });
            console.log(res);
            this.index = 0;
          });
          this.setAdd(false);
        });
      } else {
         if(this.removeList.length){
        this.classifyForm.removeList = this.removeList
      }
        new Promise((resolve, reject) => {
          this.$refs.uploadfile.submit();
          resolve();
        }).then(data => {
          this.from = JSON.stringify(this.classifyForm);
          this.upload.append("form", this.from);
          console.log(this.upload);
          this.$http({
            method: "POST",
            url: "/api/updatefirClassify",
            data: this.upload
          }).then(res => {
            this.$nextTick(() => {
              loadingInstance.close();
              Message.success({
                message: res.data.message
              });
            });
            console.log(res);
            this.index = 0;
          });
          this.setAdd(false);
        });
      }
    }
  }
  // watch: {
  //   'classifyForm.firstClassify': function(){
  //   //  this.classifyForm.secClassify = ""

  //   }
  // }
};
</script>
<style>
</style>
