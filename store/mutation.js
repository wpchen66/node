
import * as types from './mutation-type'
const mutations = {
  [types.SET_GOODS_INFO] (state, goodsInfo) {
    state.goodsInfo = goodsInfo
  },
  [types.SET_ADDSHOW](state, addShow){
    console.log(addShow, 'mutation')
    state.addShow = addShow
  },
  [types.SET_CLASSIFY_INFO](state, classifyInfo){
    state.classifyInfo = classifyInfo
  }
}
export default mutations