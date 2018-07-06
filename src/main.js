// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.config.js'
import axios from 'axios'
import '../static/css/clearcss.css'
import store from '../store/index.js'
import {
  getLstorage
} from './utils/util.js'
Vue.config.productionTip = false
/* eslint-disable no-new */
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(req => {
  console.log(req)
  let token = getLstorage('token')
  if (token) {
    req.headers['Authorization'] = token
  } else {
    token = window.btoa("nucleus" + ":" + "nucleus-secret");
    req.headers.Authorization = `Basic ` + token;
    req.headers['Content-Type'] = 'application/json';
  }
  return req
})

Vue.prototype.$http = axios
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
  store
})