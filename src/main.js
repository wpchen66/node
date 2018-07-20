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
import {Message} from 'element-ui'
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

axios.interceptors.response.use(res => {
  console.log(res)
  if(res.data.token===0){
    res.data.message ='登陆超时,请重新登陆'
    return res
  }else{
    return res
  }
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