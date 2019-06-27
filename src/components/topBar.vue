<!--点击返回顶部组件-->
<template>
  <div class="mobile-top" ref="mobileTop">
    <div class="to-top" ref="toTop"></div>
    <div class="content">
        <fast-click @click.native="cancel" class="left">
          <icon v-if="back" :icon-class="leftClass" :size="20"></icon>
        </fast-click>
        <div class="title dian">{{title}}</div>
        <icon v-if="rightClass" class="right" :size="20"  :icon-class="rightClass"></icon>
        <slot></slot>
        <div v-if="saveBtn" class="right save-btn" @click="save">{{saveBtnText}}</div>
      </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        timer:null,
        isOutsidePage:false,
        from:'CC',
      }
    },
    inject:['backHome'],
    props:{
      leftClass:{
        type:String,
        default:"icon-toleft"
      },
      saveBtn:{
        type:Boolean,
        default:false
      },
      saveBtnText:{
        type:String,
        default:"保存"
      },
      rightClass:{
        type:String,
        default:""
      },
      title:{
        type:String,
        default:""
      },
      back:{
        type:[Boolean,String],
        default:true
      },
      popup:{
        type:Boolean,
        default:false,
      }
    },
    mounted(){
      //默认点击顶部区域，滚动组件回到顶部
      this.$refs['toTop'].addEventListener('touchstart',()=>{
        clearTimeout(this.timer);    /*防止双击多次执行*/
        this.timer = setTimeout(()=>{
          this.Bus.$emit("toTop");
        },50)
      })
    },
    created(){
      //是否是外面的页面
      this.isOutsidePage = this.$route.params.inside
      this.from = this.$route.params.from
    },
    methods:{
      cancel(){
        if(this.popup){ //内页跳转或者返回首页；
          this.$emit('cancel')
        }else{
          this.backHome();
        }
      },
      save(){
        this.$emit('save')
      },
    }
  }
</script>
<style lang="scss" scoped>
  .content{
    position: relative;
    padding:0 1.2rem 0 1.2rem;
    height: 42.5px;
    overflow: hidden;
    color: #fff;
    .left{
      position: absolute;
      left: 0.2rem;
      top:50%;
      transform: translateY(-50%);
    }
    .title{
      font-size: 16px;
      line-height: 42.5px;
      font-size: 18px;
    }
    .right{
      position: absolute;
      right: 0.2rem;
      top:50%;
      transform: translateY(-50%);
    }
    .save-btn{
      padding: 2px 5px;
      border: 1px solid #fff;
      border-radius: 3px;
    }
  }
  .my-popup .mint-button{
    height: 33px;
  }

  .to-top{
    height: 55px;
    opacity: 0;
    position:absolute;
    top: 0;
    left: 1rem;
    right: 1rem;
    z-index: 3000;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
