<!--封装 mint-ui 的弹窗组件，不需要一个个定义变量和方法来控制 弹窗的显示隐藏
  * position： right  从右边划出弹窗
  * radius：是否圆角弹窗
  * 打开弹窗： this.$refs[`你定义的popup的ref`].open()
  * 关闭弹窗： this.$refs[`你定义的popup的ref`].close()
-->

<template>
  <mt-popup v-model="visible" :class="{radiusPopup:radius,wh100:!radius}"
            :modal="radius"   :closeOnClickModal="false" :popup-transition="radius?`popup-fade`:``" :position="position">
    <slot v-if="reload"></slot>
  </mt-popup>
</template>
<script>
  export default {
    data: function () {
      return {
        visible: false,
        reload:true,
      }
    },
    props:{
      position:{
        type:String,
        default:""
      },
      radius:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      open(){
        this.noScrollAfter.open(this,`visible`)
      },
      close(reload=''){
        /*如果传入字符串 reload ，表示关闭后组件刷新，不保存数据，方便表单填写*/
        if(reload==='reload'){
          this.reload = false;
          this.$nextTick(()=>this.reload = true);
        }
        this.noScrollAfter.close(this,`visible`)
      },
      state(){
        return this.visible;
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
