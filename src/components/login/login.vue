<template>
  <div id ="login">
    <div class="login" >
      <form @submit.prevent="login">
      <div class="username">
        <label for="username">用户名:</label><input ref="username" placeholder="请输入用户名或者电话" id="username" name="username" type="text">
      </div>
      <div class="password">
        <label for="password">密码:</label><input ref="password" placeholder="请输入密码" id="password" name="password" type="password"> 
      </div>
      <button type="submit">提交</button>
      </form>
    </div>
    <div>
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { setLstorage } from "@/utils/util.js";
import { Message } from "element-ui";
import { Loading } from "element-ui";
export default {
  methods: {
    login: function() {
      const _this = this;
      const username = _this.$refs.username.value;
      const password = _this.$refs.password.value;
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
            setLstorage('token', res.token)
            _this.$router.push('/goodslist')
          } else {
            Message.error({
              message: res.message
            });
          }
        });
    }
  }
};
</script>
<style>
</style>


