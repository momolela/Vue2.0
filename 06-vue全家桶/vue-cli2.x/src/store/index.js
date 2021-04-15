import Vue from 'vue';
import vuex from 'vuex';
// 引入 store 对象，可以分模块，也可以全部写在本文件里面
import all from './core/all';

Vue.use(vuex);

// 单一状态树（单一数据源），不要用很多 store
export default new vuex.Store({
  modules: {
    all: all
  }
});
