<template>
  <div id ="login">
    <div class="login" >
      <!-- <form @submit.prevent="login">
      <div class="username">
        <label for="username">用户名:</label><input ref="username" placeholder="请输入用户名或者电话" id="username" name="username" type="text">
      </div>
      <div class="password">
        <label for="password">密码:</label><input ref="password" placeholder="请输入密码" id="password" name="password" type="password"> 
      </div>
      <button type="submit">提交</button>
      </form> -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="loginForm.username" auto-complete="off" placeholder="请输入用户名或者手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" auto-complete="off" v-model.trim="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="cz">
          <el-button type="primary" @click.prevent="login">提交</el-button>
          <el-button type="primary"  @click.prevent="register">注册</el-button>
        </div>
      </el-form> 
    </div>
  </div>
</template>
<script>
import Vue from "vue";

import { setLstorage } from "@/utils/util.js";
import { Message, Loading, Form, Input, FormItem, Button } from "element-ui";
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Button);
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名或者手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login: function() {
      const _this = this;
      const username = this.loginForm.username;
      const password = _this.loginForm.password;
      if (!username) {
        Message.error({
          message: "账号不能为空"
        });
        return;
      }
      if (!password) {
        Message.error({
          message: "密码不能为空"
        });
        return;
      }
      let loading = Loading.service({
        fullscreen: true
      });
      _this
        .$http({
          method: "POST",
          url: "/api/login",
          data: {
            username,
            password
          }
        })
        .then(data => {
          let res = data.data;
          let status = res.success;
          loading.close();
          if (res.success) {
            Message.success({
              message: res.message
            });
            setLstorage("token", res.token);
            _this.$router.push("/index");
          } else {
            Message.error({
              message: res.message
            });
          }
        });
    },
    register:function(){
      this.$router.push('/register')
    }
  }
};
</script>
<style lang="less">
  .login{
    width: 400px;
    height: 400px;
    margin: 100px auto;
    // border: 1px solid #d6d6d6;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .cz{
      align-self: center;
      display: flex;
      justify-content: center;
      a{
        color: #fff;
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
  }
</style>


