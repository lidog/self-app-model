// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//加入状态管理
import store from '@/store'

//按需引入mintUi组件，并注册为全局组件
import 'mint-ui/lib/style.css'
import {
  Radio,
  Actionsheet,
  Switch,
  Popup,
  Button,
  DatetimePicker,
  Picker,
  loadmore,
  Indicator,
  MessageBox,
  Toast,
} from 'mint-ui'

Vue.component(Radio.name, Radio)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Switch.name, Switch);
Vue.component(Popup.name, Popup)
Vue.component(Button.name, Button)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker);
Vue.component(loadmore.name, loadmore);

/*底部自动消失提示*/
Vue.prototype.ToastTip = function (message,className='info',time=2000,position='bottom') {
  Toast({
    message: message,
    duration: time,
    position:position,
    className:className
  });
  return Promise.resolve();
}
/**
 * 作者：lzh
 * 功能：弹窗带确定提示，
 * 参数：message:提示内容，type 标题内容,cancel 是否显示 取消按钮
 * 返回值：promise 对象
 */

Vue.prototype.MessageBox = MessageBox;
Vue.prototype.confirm = function (message='',cancel=false,type='info') {
  let title = '';
  if(!type||type=='info'){
    title = '提示信息'
  }else
  if(type=='warn'){
    title = '警告提示'
  }else
  if(type=='suc'){
    title = '成功提示'
  }else
  if(type=='err'){
    title = '错误提示'
  }else {
    title = type
  }
  return this.MessageBox({
    closeOnClickModal: false,
    showCancelButton: cancel,
    confirmButtonText: '确定',
    title: title,
    message:message,
  }).then((res) => {
    if (res == "confirm") return Promise.resolve();
    if(res == "cancel") return Promise.reject();
  })
}

//引入公共样式
import '@/common/reset.css'
import '@/common/common.scss'
import '@/common/tools.scss'
import '@/common/fixbug.scss'

//引入阿里图标
import "@/assets/icon/alifont.css"

//动态注册全局组件
import '@/common/componentRegister.js'
//动态注册页面
import '@/common/pageRegister.js'

//引入常用图标库
import feather from 'vue-icon'
Vue.use(feather, 'v-icon');

//引入通用正则
import {pattens} from '@/util/patten.js'
Vue.prototype.pattens = pattens;

//引入工具库
import tools from "@/util/tools"
Vue.prototype.tools = tools;

//引入 noScrollAfter 方法，打开某个窗口的时候，自动阻止滑动穿透
Vue.prototype.noScrollAfter = tools.noScrollAfter('no-scroll');

//引入 axios 实例
import $http from '@/util/$http'
Vue.prototype.$http = $http;

//引入 api 表
import ajaxApi from "@/util/ajaxApi"
Vue.prototype.ajaxApi = ajaxApi

//制作eventBus
Vue.prototype.Bus = new Vue();

Vue.config.productionTip = false

//判断是否是iphoneX
Vue.prototype.isIphoneX = /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)? true:false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
