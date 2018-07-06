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
         <el-upload
        action="/api/addGoods"
        :multiple="true"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="changeHandle"
        :limit="limit"
        :file-list="uploadList">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
       <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form>
      <!-- action="https://jsonplaceholder.typicode.com/posts/"   -->
     
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
export default {
  data() {
    return {
      form: {
        name: null,
        des: null,
        price: null,
        number: null
      },
      dialogVisible:false,
      dialogImageUrl: null,
      uploadList:[],
      limit: 6
    };
  },
  methods: {
    changeHandle: function(file, fileList){
      this.uploadList = fileList
    },
    onSubmit: function() {
      const name = form.name
      const des = form.des
      const fileList = this.uploadList
      const price = form.price
      const number = form.number
      this.$http({
        method: 'POST',
        url:'/api/addGoods',
        data: {
          name,
          des,
          price,
          number,
          fileList
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
};
</script>
<style lang="less">
.input-width {
  width: 300px;
}
</style>
