<template>
  <img :src="require('@/assets/img/icon/' + name + '.svg')" :style="'height: ' + 100*scale + '; width:' + 100*scale + '%'" />
</template>

<script>
  export default {
    props: {
      name: {
        default: 'default',
        type: String
      },
      scale: {
        default: '1',
        type: String
      }
    }
  }
</script>

<style>
  
</style>