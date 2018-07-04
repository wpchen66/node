export function getLstorage (item) {
  return  window.localStorage.getItem(item) || null
}
export function setLstorage(item, val) {
  window.localStorage.setItem(item, val)
}