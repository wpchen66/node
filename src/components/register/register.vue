<template>
  <div id="register">
    <div class="register">
      <!-- <form @submit.prevent="reg" id="register-info" >
      <div class="nickname">
        <label for="nickname">昵称:</label><input ref="nickname" id="nickname" name="nickname" type="text">
      </div>
      <div class="username">
          <div class="mobile">
          <label for="mobile">手机号码:</label><input ref="mobile" id="mobile" name="mobile" type="text" maxlength=11>
      </div>
        <label for="username">用户名:</label><input ref="username" id="username" name="username" type="text">
      </div>
      <div class="password">
        <label for="password">密码:</label><input ref="password" id="password" name="password" type="password"> 
      </div>
      <button type="submit" >注册</button>
      </form> -->
      <el-form :model="registerForm" :rules="rules" ref="loginForm" label-position="left" label-width="75px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model.trim="registerForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户名"  prop="username">
          <el-input v-model.trim="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.trim="registerForm.mobile" maxlength="11"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" auto-complete="off" v-model.trim="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="cz">
          <el-button type="primary" @click.prevent="login">提交</el-button>
          <el-button type="primary"  @click.prevent="reg">注册</el-button>
        </div>
      </el-form> 
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { Message, Loading, Form, Input, FormItem, Button } from "element-ui";
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Button);
export default {
  data(){
    return {
      registerForm: {
        username:'',
        password: '',
        nickname: '',
        mobile: ''
      },
      rules: {
        nickname: [
         { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          username: [
           { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          mobile: [
           { required: true, max:11, min:11,message: '请输入11位的手机号', trigger: 'blur' }
          ],
          password: [
           { required: true ,message: '请输入11位的手机号', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    reg: function () {
      const _this = this;
      let nickname = _this.registerForm.nickname
      let  mobile = _this.registerForm.mobile
      let  username = _this.registerForm.username
      let  password =  _this.registerForm.password
      if(!nickname){
        return 
      }
      if(!mobile){
        return 
      }
      if(!username){
        return 
      }
      if(!password){
        return 
      }
      if(/[^0-9]/g.test(mobile)){
        Message.error({
          message: '请输入正确的手机号'
        })
        return
      }
      _this.$http({
        url: '/api/register',
        method: 'POST',
        data: {
          nickname,
          mobile,
          username,
          password
        }
      })
      .then(data => {
        console.log(data)
      })
      return false;
    }
  }
};
</script>
<style lang="less">
#register{
  display: flex;
  justify-content: center;
  align-items: center;
}
.register{
  margin-top: 200px;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  .cz{
    display: flex;
    justify-content: center;
  }
}
</style>
