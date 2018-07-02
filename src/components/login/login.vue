<template>
  <div id ="login">
    <div class="login">
      <form action="127.0.0.1:3000/login" method="post">
      <div class="username">
        <label for="username">用户名:</label><input id="username" name="username" type="text">
      </div>
      <div class="password">
        <label for="password">密码:</label><input id="password" name="password" type="password"> 
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
export default {};
</script>
<style>
</style>


