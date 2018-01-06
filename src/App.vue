<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  #app {
    height: 100vh;
    width: 100vw;
  }
  html, body {
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: #fafafa;
    font-size: 14px;
    font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .view-box {
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
  }


  .mint-header {
    background-color: #374760 !important;
  }
  .mint-cell-wrapper, .mint-cell:last-child {
    background-image: none !important;
  }
</style>
