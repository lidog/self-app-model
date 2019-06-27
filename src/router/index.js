import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['page/home/home1'],resolve)
    },
    {
      path: '/home1',//中心1
      name: 'home1',
      component: resolve => require(['page/home/home1'],resolve)
    },
    {
      path: '/home2',//中心2
      name: 'home2',
      component: resolve => require(['page/home/home2'],resolve)
    },
    {
      path: '/example/:from/:inside',//第一个参数判断来自哪个中心，第二个判断是页面在app内，还是app外
      name: 'example',
      component: resolve => require(['page/example'],resolve)
    },
    {
      path: '/example',
      redirect: 'example/bb/out',
    },
  ]
})
