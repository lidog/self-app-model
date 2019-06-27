/*
 * @Author lizhenhua
 * @version 2019/5/14
 * @description
 */
import router from '@/router'
const keepAlivePage=['myDraft'];//需要设置为keepAlive 的页面
//动态加入新页面
router.addRoutes(getRouter());

function getRouter() {
  const requireComponent = require.context('../page', true, /\.vue$/)
  // 用文件夹名字拼凑出router对象
  let arr = requireComponent.keys().map(item=>{
     return  /^\.\/(.*)\//.exec(item)[1]
  })
  arr = arr.filter(item=>{
    return !/\//.test(item)&&item!=='home'
  })
  let routerArr = [];
  arr.forEach(item=>{
    routerArr.push({
      //参数inside 为in 表示 当前页面是在流程中心点过来的。
      path: '/'+item+'/:from/:inside',//我的申请
      name: item,
      meta:{
        keepAlive:keepAlivePage.indexOf(item)!==-1?true:false,
      },
      component: resolve => require(['page/'+item],resolve)
    },{
      path: '/'+item,//我的申请
      redirect: item+'/ll/out',
    })
  })
  return routerArr
}

//出来的路由格式
// {
//   path: '/permitManagement/:from/:inside',//授权工作台
//   name: 'permitManagement',
//   component: resolve => require(['page/permitManagement'],resolve)
// },
// {
//   path: '/permitManagement',//授权工作台
//   redirect: 'permitManagement/ll/out',
// },



