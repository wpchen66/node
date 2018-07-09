<template>
  <div id="addGoods">
    <h2>添加商品</h2>
    <div>
      <el-form ref="form" :model="form"  label-width="80px">
        <el-form-item label="商品名称">
          <el-input class="input-width" v-model="form.name"></el-input>
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
         <el-upload
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
      <w-upload>
      </w-upload>
       <el-button type="primary" @click.prevent="onSubmit">立即创建</el-button>
      </el-form>
      <!-- action="https://jsonplaceholder.typicode.com/posts/"   -->
     
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Form, FormItem, Input, Button, Upload, Dialog } from "element-ui";
import WUpload from '@/util-component/upload'
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Dialog);
export default {
  data() {
    return {
      form: {
        name: null,
        des: null,
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
      index: 0
    }
  },
  methods: {
    changeHandle: function (file, filelist) {
      this.uploadList = filelist
    },
    beforeInfo: function(item) {
      console.log(this.index)
      // console.log(item);
      // })
      console.log(item, 123132)
      this.upload.append(this.index, item);
      // this.list[this.index] = item
      this.index++
      return false;
    },
    onSubmit: function() {
      const name = this.form.name;
      const des = this.form.des;
      // const fileList = this.uploadList
      const price = this.form.price;
      const number = this.form.number;
      console.log(this.uploadList);
      this.upload = new FormData();
      // fileList.forEach(function (item, index) {
      //   const render = new FileReader()
      //   // item.url = item.url.substr(1,item.url.length-2)
      //    console.log(typeof item.url)
      //   const url = render.readAsDataURL(item.url)

      // })
      new Promise((resolve, reject) => {
        this.$refs.uploadfile.submit();
        resolve()
      }).then(data => {
      this.from = JSON.stringify(this.form)
        this.upload.append("form", this.from);
        console.log(this.upload)
        this.$http({
          method: "POST",
          url: "/api/addGoods",
          data: this.upload
        }).then(res => {
          console.log(res);
          //  this.list = {}
           this.index = 0;
        });
      });
    }
  },
  components: {
    WUpload
  }
};
</script>
<style lang="less">
.input-width {
  width: 300px;
}
</style>
