import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
import state from './state.js'
import mutations from './mutation.js'
import * as actions from './actions' 
const store = new Vuex.Store({
  state,
  mutations,
  actions
})
export default store