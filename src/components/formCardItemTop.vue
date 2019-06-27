<!--title 在top 的表单item-->
<template>
  <div class="form-item">
    <div class="form-item-title" v-if="title">
      <slot name="before-title-icon"></slot>
      <span class="red" :class="{required:required}">*</span>
      {{title}}
      <slot name="after-title-icon"></slot>
    </div>
    <div class="form-item-value flex-between">
      <slot></slot>
      <slot name="input-icon"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {}
    },
    props:{
      title:{
        type:String,
        default:""
      },
      required:{
        type:Boolean,
        default:false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .form-item {
    background: #fff;
    font-size: 16px;
    padding-left: 0.2rem;
    padding-top: 8px;
    padding-bottom: 12px;
    padding-right: 0.23rem;
    .red{
      color: red;
      display: none;
      vertical-align: middle;
      position: absolute;
      left:-0.1rem;
      top:50%;
      transform: translateY(-50%);
    }
    .required{
      display: inline-block;
    }
    .form-item-title {
      color: #8a8a8a;
      text-align: left;
      height: 0.5rem;
      line-height: 0.5rem;
      position: relative;
      padding-left: 0.1rem;
    }
    &.no-val .form-item-value{
      display: none;
    }
    .form-item-value {
      color: #191919;
      margin-top: 0.1rem;
      border: 1px solid #cccccc;
      border-radius: 5px;
      overflow: hidden;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input{
        border: none;
        margin: 0;
        padding:0 0.2rem;
        height: 100%;
        width: 100%;
      }
      select,textarea{
        border: 1px solid #eaeaea;
        padding: 0.1rem;
        width: 100%;
        background-color: #fff;
      }
      textarea{
        resize: none;
        min-height: 90px;
        border-radius: 5px;
        border:none;
      }
      .iconfont{
        font-size: 20px;
        padding-left: 0.1rem;
        border-left: 1px solid #a4e1fe;
      }
    }
  }
  .diy-content.form-item .form-item-value{
    border: none;
    height: auto;
  }
  .no-flex.form-item .form-item-value{
    display: block;
  }
  .border{
    border-bottom: 1px solid #F2F2F2;
    padding: 0.1rem 0.23rem 0.1rem 0
  }
</style>
