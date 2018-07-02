// const Vue = require('vue');
import Vue from 'vue'
import VueRouter from 'vue-router';
// import { resolve } from 'path';
Vue.use(VueRouter)


const Login = (resolve) =>  {
  import ('com/login/login').then(module =>{
    resolve(module)
  })
}
const Register = (resolve) =>  {
  import ('com/register/register').then(module =>{
    resolve(module)
  })
}

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router
