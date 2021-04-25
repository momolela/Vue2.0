import { INCREMENT } from './mutations-type.js';

export default {
  // 修改全局共享变量的入口，
  // vue 文件中可以用 $store.commit('方法名') 来调用，
  // 通过 mutations 来做修改，可以通过 dev-tools 插件查看修改的链路
  // [INCREMENT] 常量名是官方推荐的做法，防止这边定义，页面 commit 错，然后页面出错，所以选了常量，页面上用 this.$store.commit(INCREMENT);
  // 这里面的都是些同步操作，因为要配合 dev-tools 插件记录链路，异步操作不好记录
  [INCREMENT](state) {
    state.counter++;

    // 这里不能用异步操作，在 dev-tools 插件记录链路数据不会变
    // setTimeout(() => {
    //   state.counter++;
    // }, 1000);
  },
  decrement(state) {
    state.counter--;
  },
  incrementParam(state, payload) {
    // payload 就是接收参数用的
    // 可以传递简单的参数，
    // 也可以传递对象
    // 针对页面的参数提交风格不同，payload 也可以完全作为一个对象接收
    state.counter += payload;
  }
};
