// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.config.js'
import axios from 'axios'
Vue.config.productionTip = false

/* eslint-disable no-new */
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})
