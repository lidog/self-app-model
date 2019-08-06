<template>
      <mt-button :type="type" :size="size"
                 @click.native="clickEv" :disabled="!firstCommit">
        <slot></slot>
      </mt-button>
</template>
<script>
    export default {
      data: function () {
          return {
            firstCommit:true,
          }
      },
      props:{
        type:{
          type:String,
          default:"default"
        },
        size:{
          type:String,
          default:"large"
        },
        debounce:{ //默认防抖
          type:Boolean,
          default:true
        },
        throttle:{ //节流
          type:Boolean,
          default:false
        },
        time:{ //间隔时间
          type:Number,
          default:1000
        }
      },
      created(){
        let argument = [()=>{
          this.firstCommit = false;
          this.$emit('click')
        },this.time,()=>{this.firstCommit = true;}];
        if(this.throttle){
          this.clickEv = this.throttleFn(...argument)
        }else {
          this.clickEv = this.debounceFn(...argument)
        }
      },
      methods:{
        debounceFn(func,wait,afterFn) {
          let timeout;
          return function () {
            let context = this;
            let args = arguments;
            if (timeout) clearTimeout(timeout);
            let callNow = !timeout;
            timeout = setTimeout(() => {
              timeout = null;
              if(afterFn)afterFn()
            }, wait)
            if (callNow) func.apply(context, args)
          }
        },
        throttleFn(func, wait,afterFn) {
          let timeout;
          return function() {
            let context = this;
            let args = arguments;
            if (!timeout) {
              timeout = setTimeout(() => {
                timeout = null;
                if(afterFn)afterFn()
                func.apply(context, args)
              }, wait)
            }
          }
        }
      },
    }
</script>
<style lang="scss" scoped>
</style>
