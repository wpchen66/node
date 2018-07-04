<template>
  <div id="goodsList">

  </div>
</template>
<script>
export default {
  data (){
    return {
      goodsList: null
    }
  },
  mounted () {
    this.$http({
      url: '/api/getGoodsList',
      method: 'GET',
    }).then(data => {
      console.log(data)
    })
  }
}
</script>
<style>
</style>

