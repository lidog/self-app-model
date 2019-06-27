<!--上拉加载更多，下拉刷新组件-->
<template>
  <div class="loader-more" ref="loadBox">
    <mt-loadmore :topMethod="topMethod"
                 :bottomMethod="bottomMethod"
                 :topPullText="`下拉刷新`"
                 :bottomPullText="`上拉加载更多`"
                 :autoFill="false"
                 :bottomDistance="40"
                 :topDistance="60"
                 :bottomAllLoaded="bottomAllLoaded"
                 ref="loadmore">
      <ul class="load-more-content" v-if="rows.length>0">
          <slot v-for="(item,index) in rows" v-bind="{item,index}"></slot>
      </ul>
      <ul v-else>
        <li class="no-data">{{loadingText}}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        rows: [],
        loadingText: '',
        total: 0,
        bottomAllLoaded:false,
        timer:null,
        search: {
          page: 1,
          size: 10,
        },
      }
    },
    props: {
      top:{
        type:[Number,String],
        default:0
      },
      bottom:{
        type:[Number,String],
        default:0
      },
      itemProcess:{ //列表项目处理函数
        type:Function,
        default:null
      },
      url:{
        type:String,
        default:""
      },
      param:{ //查询参数
        type:Object,
        default:{}
      },
      type:{  //配置ajax方法类型
        type:String,
        default:"get"
      },
      dataKey:{ //读取接口的数据的key
        type:String,
        default:"content"
      },
      clickToTop:{ //是否开启点击顶部回到开始
        type:Boolean,
        default:true,
      },
      proxyFn:{//自己处理原始数据
        type:[Function,Boolean],
        default:false
      },
      paramFn:{ //自己处理ajax 参数
        type:[Function,Boolean],
        default:false
      },
      autoData:{ //初始化自动ajax数据
        type:Boolean,
        default:true,
      }
    },
    watch:{
      rows(val){
        this.$emit('change',val);
      }
    },
    mounted(){
      setTimeout( ()=>{
        var myDiv = document.getElementsByClassName('mobile-top')[0];
        //利用判断是否支持currentStyle（是否为ie）来通过不同方法获取style
        var finalStyle = myDiv.currentStyle ? myDiv.currentStyle : document.defaultView.getComputedStyle(myDiv, null);
        //iphoneX 多出来的paddingTop
        var iphoneXPT = parseInt(finalStyle.paddingTop)==20?0:parseInt(finalStyle.paddingTop)-20;
        this.$refs.loadBox.style.top = parseInt(this.top) + iphoneXPT +"px";
        this.$refs.loadBox.style.bottom = parseInt(this.bottom)  + iphoneXPT +"px";
      },100)  //延迟执行，fixed 获取不到paddingTop的bug
      this.search = Object.assign(this.search,this.param);
      if(this.autoData){
        this.upData();
      }
      if(this.clickToTop){
        this.Bus.$on('toTop', () => {
          this.toTop();
        })
      }
    },
    watch:{
      param(val){
        this.search = Object.assign(this.search,val);
      }
    },
    methods:{
      upData(data) {
        /*如果参数是对象，watch更新param会update方法之后执行，导致参数合并不准确bug*/
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            this.loadingText = "加载中...";
            var query = Object.assign(this.search, data);
            if(typeof this.paramFn == 'function'){
              query = this.paramFn(query);
            }
            return this.$http({
              url: this.url,
              data: query,
              type:this.type,
              loading:false,
              proxy:typeof this.proxyFn == 'function'?true:false
            }).then(res => {
              /*自定义代理函数，返回一个符合规范格式的数据
              *   res = {
              *     content:[],
              *     total:int
              *   }
              * */
              if(typeof this.proxyFn == 'function'){
                res = this.proxyFn(res);
              }
              let rows = res[this.dataKey];
              this.total = res.total;
              if (rows.length > 0) {
                if(typeof this.itemProcess == 'function'){
                  rows = this.itemProcess(rows);
                }
                this.rows = this.rows.concat(rows);
              }
              if (this.rows.length == 0) {
                this.loadingText = "暂无数据"
              }
              resolve(true)
            })
          },100)
        })

      },
      //下拉刷新
      topMethod() {
        this.bottomAllLoaded = false;
        this.rows = [];
        this.upData({
          page: 1
        }).then(res => {
          if (res) {
            this.ToastTip("刷新成功", 'suc');
            this.$refs.loadmore.onTopLoaded();
          }
        })
      },
      //上拉加载更多
      bottomMethod() {
        if (this.rows.length < this.total) {
          this.bottomAllLoaded = false;
          this.upData({
            page: ++this.search.page
          }).then(()=>{
            this.$refs.loadmore.onBottomLoaded();
          })
        } else {
          this.bottomAllLoaded = true;
          this.ToastTip("没有更多数据了！")
          this.$refs.loadmore.onBottomLoaded();
        }
      },
      refresh(){
        this.bottomAllLoaded = false;
        this.rows = [];
        this.upData({
          page: 1
        }).then(res => {
          if (res) {
            this.$refs.loadmore.onTopLoaded();
          }
        })
      },
      //对外提供控制上拉刷新
      allLoad(bool){
        this.bottomAllLoaded = bool;
      },
      //清空数据
      clearData(){
        this.rows = [];
      },
      //处理item的函数，方便父组件对列表项目操作
      processData(callBack){
        callBack(this.rows);
      },
      //点击顶部标题滚动到列表开头
      toTop(){
        var app = document.getElementsByClassName('scrolling')[0]||document.getElementsByTagName('body')[0];
        app.className ="";/*fix 移动端由于惯性滑动造成页面颤抖的bug*/
        clearInterval(this.timer);
        this.timer =setInterval(()=>{
          var scrollTop= this.$el.scrollTop;
          var ispeed=Math.floor(-scrollTop/8);
          if(scrollTop==0){
            app.className ="scrolling";
            clearInterval(this.timer);
          }
          this.$el.scrollTop = scrollTop+ispeed;
        },10);
        /*fix 上拉未完成时，拉动列表，导致重复上提的bug*/
        document.addEventListener('touchstart',(ev)=>{
          if(this.$refs['loadBox']&&this.$refs['loadBox'].contains(ev.changedTouches[0].target)){
            app.className ="scrolling";
            clearInterval(this.timer);
          }
        })
      },
      //获取当前滚动位置
      getPosition(){
        return this.$el.scrollTop;
      },
      //设置滚动位置
      setPosition(position=0){
        this.$el.scrollTop = position;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .loader-more {
    padding-bottom: 0.2rem;
    background-color: #fff;
    overflow-y: auto;
    /*position: fixed;*/
    position: absolute;
    left: 0;
    right: 0;
    box-sizing: border-box;
  }
</style>
