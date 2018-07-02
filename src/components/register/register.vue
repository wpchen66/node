<template>
  <div id="register">
    <div class="register">
      <form @submit.prevent="reg" id="register-info" >
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
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  methods: {
    reg: function () {
      const _this = this;
      let nickname = _this.$refs.nickname.value
      let  mobile = _this.$refs.mobile.value
      let  username = _this.$refs.username.value
      let  password =  _this.$refs.password.value
      if(!nickname.trim()){
        return 
      }
      if(!mobile.trim()){
        return 
      }
      if(!username.trim()){
        return 
      }
      if(!password.trim()){
        return 
      }
      console.log(username)
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
<style>
</style>
