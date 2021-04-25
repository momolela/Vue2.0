import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

const state = {
  // 全局共享的变量，页面可以直接使用 $store.state.all.counter，记得要加上 counter
  counter: 10
};

// 官方建议拆分各个 js 模块
export default {
  state,
  mutations,
  getters,
  actions
};
