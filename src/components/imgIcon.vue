<!--用图片做图标组件-->
<template>
  <i class="box">
    <img ref="img" :src="fullSrc">
  </i>
</template>
<script>
  export default {
    data: function () {
      return {
        fullSrc: ''
      }
    },
    props: {
      src: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 40,
      },
      width: {
        type: Number,
        default: 40,
      },
    },
    created() {
    },
    mounted() {
      // this.fullSrc =  require('@/assets/img/' + this.src); 错
      this.fullSrc = require(`../assets/img/${this.src}`);
      this.$refs['img'].style.height = this.height+'px';
      this.$refs['img'].style.width = this.width+'px';
    }
  }
</script>
<style lang="scss" scoped>

</style>
