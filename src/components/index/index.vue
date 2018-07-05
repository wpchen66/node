<template>
  <div id="index">
    <top-bar></top-bar>
    <div class="content">
      <nav-bar></nav-bar>
      <list-content></list-content>
    </div>
  </div>
</template>
<script>
import TopBar from '../topBar/topBar'
import NavBar from '../navBar/navBar'
import ListContent from '../listContent/listContent'
export default {
  components:{
    NavBar,
    TopBar,
    ListContent
  }
}
</script>
<style>
.content{
  position: relative;
  padding-left: 200px;
  height: calc(100% - 60px);
}
</style>
