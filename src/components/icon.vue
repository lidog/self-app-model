<template>
      <i class="iconfont" :class="iconClass" :style="'font-size:'+ size +'px;color:'+color+';'"></i>
</template>
<script>
    export default {
      props: {
        iconClass: {
          type: String
        },
        size:{
            type:[Number,String],
        },
        color:{
          type:String
        }
      },
      data: function () {
          return {}
      },
    }
</script>
<style scoped>
  i{
    margin-right: 5px;
  }

</style>
