// const Vue = require('vue');
import Vue from 'vue'
import VueRouter from 'vue-router';
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
const GoodsList = (resolve) => {
  import('com/listContent/listContent').then(module => {
    resolve(module)
  })
}
const Index = (resolve) => {
  import('com/index/index').then(module => {
    resolve(module)
  })
}
const ClassifyList = (resolve) => {
  import('com/classifyList/classifyList').then(module => {
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
    },
    {
      path: '/goodslist',
      name: 'goodslist',
      component: GoodsList
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/index/goodslist',
      component: Index,
      children: [
        {
          path: 'goodslist',
          name: 'goodslist',
          component: GoodsList
        },
        {
          path: 'classifylist',
          name: 'classifylist',
          component: ClassifyList
        }
      ]
    }
  ]
})

export default router
