/*
 * @Author lizhenhua
 * @version 2018/5/16
 * @description
 */

import Vue from 'vue'
import Vuex from 'vuex'
import appData from './modules/appData.js'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    appData
  },
  getters
})

export default store

