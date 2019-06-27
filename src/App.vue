<template>
  <div id="app">
<!--<transition :name="transitionName"></transition>-->
    <keep-alive>
      <router-view v-if="isRouterAlive&&$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="isRouterAlive&&!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isRouterAlive: true,
        transitionName:'',
        first:true,
      }
    },
    provide() {
      return {
        reload: this.reload,
        backHome:this.backHome
      }
    },
    created() {
      this.resize(document, window);
    },
    mounted(){
      //全局修复安卓弹窗键盘顶起底部的bug
      // this.tools.fixInputBug();
    },
    watch: {//使用watch 监听$router的变化，可以做transition动画
      '$route' (to, from) {
        let judge = to.path=='/controlCenter' || to.path=='/startFlow'? true:false;
        if(judge && this.first){
          this.transitionName = 'slide-left'
          this.first = false;
        }else if(!this.first){
          this.transitionName = judge ? 'slide-right' : 'slide-left'
        }
      }
    },
    methods: {
      /*设置rem参照单位。width：1rem = 50px 所以设计稿宽 375px == 375/50 = 7.5rem
      * 由于页面中有些元素用了绝对定位。特别是top，bottom。由于设备不同，计算出的rem不同，
      * 导致定位覆盖。所以，建议涉及高度的 统一用 px 做单位，包括padding-top,bottom等。
      * 因为高度存在滚动条，不存在适配问题。主要针对宽度做适配。
      * */
      resize(doc, win) {
        var docE1 = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function () {
            var clientWidth = docE1.clientWidth;
            if (!clientWidth) return;
            docE1.style.fontSize = (clientWidth / (375*2)) * 100 + 'px'; //乘以100的意义是，为了不受fontsize小于12的影响，并且计算方便；
          };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      },
      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      },
      backHome(){ //返回首页或退出webview
        let  isOutsidePage = this.$route.params.inside;
        let  from = this.$route.params.from;
        if(isOutsidePage=='in'){ //内页跳转
          if(from=="A"){ //回到流程中心
            this.$router.replace('/home1')
          }else if(from=="B"){ //回到发起流程
            this.$router.replace('/home2')
          }else { //回到原来的子页面（从a页到b页前，必须要先保存lastFullPath）
            this.$router.replace(this.$store.getters.lastFullPath)
            this.$store.commit('setLastFullPath',"")//置空旧路径
          }
        }else{//关闭webView
          if(RNWebView){
            RNWebView.closeWebView();
            RNWebView.refreshList()
          }
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'PingFangSC-Regular', 'sans-serif', 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .scrolling{
    -webkit-overflow-scrolling: touch;/*这个属性让手机端滑动有顺滑的感觉*/
  }

  #app::-webkit-scrollbar {
    width: 0;
    height: 0;
  }


  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 300ms;
    position: absolute;
    left: 0;/*left 0 ，解决动画卡顿问题*/
    right: 0;/*right 0 ，解决动画卡顿问题*/
  }
  .slide-right-enter {
    webkit-transform: translate3d(-100%,0,0);
    -moz-transform: translate3d(-100%,0,0);
    -ms-transform: translate3d(-100%,0,0);
    -o-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    webkit-transform: translate3d(100%,0,0);
    -moz-transform: translate3d(100%,0,0);
    -ms-transform: translate3d(100%,0,0);
    -o-transform: translate3d(100%,0,0);
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    webkit-transform: translate3d(200%,0,0);
    -moz-transform: translate3d(200%,0,0);
    -ms-transform: translate3d(200%,0,0);
    -o-transform: translate3d(200%,0,0);
    transform: translate3d(200%, 0, 0);
  }
  .slide-left-leave-active {
    webkit-transform: translate3d(-100%,0,0);
    -moz-transform: translate3d(-100%,0,0);
    -ms-transform: translate3d(-100%,0,0);
    -o-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%, 0, 0);
  }

</style>
