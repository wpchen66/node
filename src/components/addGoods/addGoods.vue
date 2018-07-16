<template>
  <div id="addGoods">
    <h2>添加商品</h2>
    <div>
      <el-form ref="form" :model="form"  label-width="120px">
        <el-form-item label="商品名称">
          <el-input class="input-width"  v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item  label="商品描述">
          <el-input class="input-width" type="textarea" v-model="form.des"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input class="input-width" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input class="input-width" v-model="form.number"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item  label="添加商品图片"></el-form-item>
         <el-upload
         class="upload"
         action="string"
        :multiple="true"
        ref="uploadfile"
        :before-upload="beforeInfo"
        :on-change="changeHandle"
        :auto-upload="false"
        list-type="picture-card"
        :limit="limit"
        :file-list="uploadList">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
        <!-- 加载编辑器的容器 -->
        <el-form-item class="detail-lab" label="添加商品详情" size="100"></el-form-item>
      <editor :getContent="getContent" :setting="editorSetting" class="editor">
      </editor>  
       <el-button class="submit" type="primary" @click.prevent="onSubmit">立即创建</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Form, FormItem, Input, Button, Upload, Dialog } from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Dialog);

import Editor from "com/editor/editor";
export default {
  props: {
    setAdd:{
      type: Function
    }
  },
  data() {
    return {
      form: {
        name: "",
        des: "",
        price: null,
        number: null
      },
      upload: {
        name: ""
      },
      dialogVisible: false,
      dialogImageUrl: null,
      uploadList: [],
      list: {},
      limit: 6,
      index: 0,
      editorSetting: {
        width: 1200,
        height: 500,
        toolbar: [
          "newdocument bold italic underline strikethrough alignleft aligncenter alignright alignjustify styleselect formatselect fontselect fontsizeselect cut copy paste bullist numlist outdent indent blockquote undo redo removeformat subscript superscript",
          "image media codesample forecolor backcolor link emoticons print code insertdatetime searchreplace"
        ],
        plugins:
          "image imagetools media  codesample textcolor colorpicker link importcss emoticons code insertdatetime searchreplace",
        codesample_content_css: '/plugins/codesample/css/prism.css',
        imagetools_cors_hosts: ["www.tinymce.com.com", "codepen.io"],
        images_upload_url: "/api/addGoods",
        file_picker_callback: function(callback, value, meta) {
          // Provide file and text for the link dialog
          if (meta.filetype == "file") {
            callback("mypage.html", { text: "My text" });
          }

          // Provide image and alt text for the image dialog
          if (meta.filetype == "image") {
            callback("myimage.jpg", { alt: "My alt text" });
          }

          // Provide alternative source and posted for the media dialog
          if (meta.filetype == "media") {
            callback("movie.mp4", { source2: "alt.ogg", poster: "image.jpg" });
          }
        }
      }
    };
  },
   created(){
      console.log(this.$store.state.goodsInfo)
      const goodsInfo = this.$store.state.goodsInfo
      if(goodsInfo){
        this.form.name = goodsInfo.name;
        this.form.des = goodsInfo.des;
        this.form.price = goodsInfo.price;
        this.form.number = goodsInfo.number
        goodsInfo.pic.forEach((item, index) => {
          let obj ={}
          obj['url'] = item
          this.uploadList.push(obj)
        })
      }
    },
  methods: {
    changeHandle: function(file, filelist) {
      this.uploadList = filelist;
    },
    beforeInfo: function(item) {
      console.log(this.index);
      console.log(item, 123132);
      this.upload.append(this.index, item);
      this.index++;
      return false;
    },
    onSubmit: function() {
      const name = this.form.name;
      const des = this.form.des;
      const price = this.form.price;
      const number = this.form.number;
      console.log(name, des, price, number);
      this.upload = new FormData();
      new Promise((resolve, reject) => {
        this.$refs.uploadfile.submit();
        resolve();
      }).then(data => {
        this.from = JSON.stringify(this.form);
        this.upload.append("form", this.from);
        console.log(this.upload);
        this.$http({
          method: "POST",
          url: "/api/addGoods",
          data: this.upload
        }).then(res => {
          console.log(res);
          this.index = 0;
        });
      });
      this.setAdd(false)
    },
    getContent: function (content){
        return content
    }
  },
  components: {
    Editor
  }
};
// plugins: "image imagetools codesample media mediaembed emoticons",
//         toolbar:
//           "image | codesample | emoticons | forecolor backcolor | paste | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
//         // external_plugins: {
//         //   powerpaste:
//         //     "http://www.server.com/application/external_plugins/powerpaste/plugin.js"
//         // },
//         codesample_languages: [
//           { text: "HTML/XML", value: "markup" },
//           { text: "JavaScript", value: "javascript" },
//           { text: "CSS", value: "css" },
//           { text: "PHP", value: "php" },
//           { text: "Ruby", value: "ruby" },
//           { text: "Python", value: "python" },
//           { text: "Java", value: "java" },
//           { text: "C", value: "c" },
//           { text: "C#", value: "csharp" },
//           { text: "C++", value: "cpp" }
//         ],
//         paste_data_images: true,
//         mediaembed_max_width: 450
//         // color_picker_callback: function(callback, value) {
//         //   callback("#FF00FF");
//         // }
</script>
<style lang="less">
.input-width {
  width: 300px;
}
.detail-lab{
  margin-top: 20px;
}
.upload{
  padding-left: 120px;
}
.submit{
  margin: 20px auto;
}
</style>
