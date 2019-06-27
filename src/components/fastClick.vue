<!--快速点击封装-->
<template>
  <div class="box fastClick">
    <slot></slot>
  </div>
</template>
<script>
  import fastclick from 'fastclick'


  export default {
    data: function () {
      return {}
    },
    mounted() {
      let dom = document.getElementsByClassName('fastClick')
      for (var i = 0; i < dom.length; i++) {
        fastclick.attach(dom[i]);
      }
    },
  }
</script>
<style lang="scss" scoped>
  .box{
    touch-action: none;
  }
</style>
