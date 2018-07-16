
import * as types from './mutation-type'
const mutations = {
  [types.SET_GOODS_INFO] (state, goodsInfo) {
    state.goodsInfo = goodsInfo
  },
  [types.SET_ADDSHOW](state, addShow){
    console.log(addShow, 'mutation')
    state.addShow = addShow
  }
}
export default mutations