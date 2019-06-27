/*
 * @Author lizhenhua
 * @version 2018/6/14
 * @description
 */
import $http from '@/util/$http'
import ajaxApi from '@/util/ajaxApi'

const appData = {
  state: {
    userInfo:null,//当前用户信息
  },
  mutations: {
    set_userInfo:(state, userInfo)=>{
      state.userInfo = userInfo;
    },
  },
  actions: {
    //获取当前用户信息
    getUser({commit},code) {
      return new Promise((resolve, reject) => {
          $http({
            url: ajaxApi.user,
          }).then(res => {
            commit('set_userInfo', res);
            resolve(res)
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
  },
}


export default appData

