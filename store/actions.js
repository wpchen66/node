import * as types from './mutation-type'
export const setGoodsInfo = ({commit}, goodsInfo) => {
  commit(types.SET_GOODS_INFO, goodsInfo)
}
export const setAddShow = ({commit}, addShow) => {
  console.log(addShow, 'actions')
  commit(types.SET_ADDSHOW,addShow)
}