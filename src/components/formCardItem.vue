<!--title 在left 的表单item-->
<template>
  <div class="form-item" :class="{border:border}">
    <div class="form-item-title">
      <span class="red" :class="{required:required}">*</span>
      <slot name="before-title-icon"></slot>
      {{itemTitle}}
      <slot name="after-title-icon"></slot>
    </div>
    <div class="form-item-value">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {}
    },
    props:{
      itemTitle:{
        type:String,
        default:""
      },
      required:{
        type:Boolean,
        default:false
      },
      border:{
        type:Boolean,
        default:false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .form-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    height: 30px;
    font-size: 16px;
    padding-left: 0.2rem;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 0.23rem;
    &.text{/*加了text 类名的 是上对齐*/
      height: auto;
      .form-item-title {
        align-self: flex-start;
      }
      .form-item-value{
        align-self: flex-start;
      }
    }
    .form-item-title {
      color: #8a8a8a;
      text-align: left;
      position: relative;
      min-width: 100px;
      padding-left: 0.1rem;
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
    }
    .form-item-value {
      color: #191919;
      width: 4.5rem;
    }
    input,select,textarea{
      border: 1px solid #eaeaea;
      padding: 0.1rem;
      width: 100%;
      background-color: #fff;
    }
    textarea{
      resize: none;
      height: 70px;
    }
  }

  .diy-content.form-item{
    height: auto;
    align-items: flex-start;
    .item-content{
      height: auto;
      text-align: left;
    }
  }

  @media screen and (max-width: 320px){
    .form-item{
      font-size: 14px;
    }
  }

  .border{
    border-bottom: 1px solid #F2F2F2;
    padding: 0.1rem 0.23rem 0.1rem 0
  }
</style>
